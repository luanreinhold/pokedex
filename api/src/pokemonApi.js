import axios from "axios";
import { Router } from "express"

const server = Router();

const urlBase = axios.create({
    baseURL : "https://pokeapi.co/api/v2"
    
})


server.get("/consulta/berry/:frutaNome", async (req,resp) => {
    try {
        const info = req.params.frutaNome;
        const retornoApi = await urlBase.get(`/berry/${info}/`)
        resp.send({retorno : retornoApi.data})
        
    } catch (error) {
        resp.send({erro: error.message})
    }
})

server.get('/consulta/pokemon/:namePokemon', async (req,resp) => {

    try{
    const { namePokemon } = req.params
    const apiCall = await urlBase.get(`/pokemon/${namePokemon}/`)
    resp.send({retorno : apiCall.data})
    } catch(error) {
        resp.status(404).send({
            error: "Ocorreu um erro " + error.message
        })
    }
})

server.get('/consulta/pokemon/species/:namePokemon', async (req,resp) =>  {
    try {
        const namePokemon = req.params.namePokemon

        const chamadaApi = await urlBase.get('pokemon-species/'+namePokemon)
        resp.send(chamadaApi.data)

    } catch (error) {
        resp.status(404).send({
            erro : "Houve um erro: " + error.message
        })
    }

})


server.get("")


export default server;

