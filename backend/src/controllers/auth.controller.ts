import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from '../config'
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
  /*
  if (req.body.roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    user.roles = [role._id];
  }*/


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
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    //comprobar contraseña
  const validPass = await bcrypt.compare(req.body.password, userFound.password);
  if (!validPass)
    return res.json("Credenciales invalidas");

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 10800, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
