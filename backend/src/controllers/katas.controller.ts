import Katas from '../models/Katas'


export const createKata = async (req, res) => {
   
   const {name, description, solution} = req.body 
   
   const newKata = new Katas({
       name, 
       description,
       solution})
   const kataSaved = await newKata.save()
    res.json(kataSaved)

}
export const getAllKatas = async (req, res) => {
   const katas = await Katas.find()
    res.json(katas)
    
}
export const  getKataById = async (req, res) => {
    const kata = await Katas.findById(req.params.kataId)
    res.json(kata)
    
}
export const updateKataById = async (req, res) => {
    const updatedKata = await Katas.findByIdAndUpdate(req.params.kataId, req.body, {
       new: true  
    })
   res.json(updatedKata)
    
}
export const deleteKataByID = async (req, res) => {
    await Katas.findByIdAndDelete(req.params.kataId)
    res.status(204).json('kata deleted')
}