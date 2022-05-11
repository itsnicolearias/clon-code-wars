import Katas, {  KataLevel } from '../models/Katas'





export const createKata = async (req, res) => {
   
   
   
   const name = req?.body?.name
    const description = req?.body?.description || 'Default description'
    const level = req?.body?.level || KataLevel.BASIC
    const intents = req?.body?.intents || 0
    const stars = req?.body?.stars || 0
    const creator = req?.body?.creator
    const solution = req?.body?.solution || 'Default Solution'
    const participants = req?.body?.participants || []

   /* const kataSent: IKata = {
      name: name,
      description: description,
      level: level,
      intents: intents,
      stars: stars,
      creator: creator,
      solution: solution,
      participants: participants
    }*/

   const newKata = new Katas({
       name, 
       description,
       level,
       intents,
       stars,
       creator,
       solution,
       participants

    })
   const kataSaved = await newKata.save()
    res.json(kataSaved)

}
export const getAllKatas = async (req, res) => {
 
  const kata = await Katas.find()
  res.json(kata)
    
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
