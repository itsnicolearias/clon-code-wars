import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "dotenv";
import Role from "../models/Role";

export const register = async (req, res) => {
  //hash password
  const saltos = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, saltos);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.json("Email ya existe");

  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) return res.json("Username ya existe");

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: password,
  });

  //buscar si el usuario ya tiene un rol asignado
  //sino le asigna por defecto el rol user

  const { roles } = req.body.roles;

  //TODO no se puede asignar el rol de admin
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "User" });
    user.roles = [role._id];
  }

  try {
    const userDB = await user.save();
    res.json(userDB);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  //comprobar si usuario existe existe en la base de datos
  const user = await User.findOne({ email: req.body.email }).populate("roles")
  if (!user) return res.json({ error: true, message: "Usuario no existe" });

  //comprobar contraseña
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.json({ error: true, message: "Credenciales invalidas" });

  //JWT
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET, {
      expiresIn: 10800
    }
  )

  //login
  res.json({
    message: "Bienvenido",
    token: token,
  });
};
