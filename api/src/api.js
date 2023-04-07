import axios from "axios"
import express from "express"

const server = express();

server.get("/frasefoda", async (req,resp) => {
    const info = await axios.get("https://api.adviceslip.com/advice")
    return resp.send(info.data)
}) 

server.get("/nasa", async (req,resp) => {
    const data = await axios.get("https://api.nasa.gov/planetary/apod?api_key=8NaslSlCoNSNbTba75cifUE1R4Wua58x2kHv8678")
    return resp.send(data.data)
}) 

server.get("/rickmorty/:id", async (req,resp) => {
    try {
        const id = req.params.id
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        return resp.send(data)
    } catch (error) {
        resp.send(error.data)
    }

})

server.post("/Yoda", async (req,resp) => {
  
        const input = req.body.text
        const response = await axios.post("https://api.funtranslations.com/translate/yoda.json", { text : input})
        resp.send(response.data)


})

server.get

export default server;