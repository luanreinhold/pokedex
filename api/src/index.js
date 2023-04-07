import express from "express"
import cors from "cors"
import api from "./api.js"
import pokemonApi from "./pokemonApi.js"
import weatherapi from './weatherapi.js'

const server = express();
let API_PORTA = 3030;

server.use(cors());
server.use(express.json());
server.use(api)
server.use(pokemonApi)
server.use(weatherapi)

server.listen(API_PORTA, () => console.log(`A api subiu na porta ${API_PORTA}`))

export default server
