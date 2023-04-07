import axios from "axios";
import { Router } from "express";

const server = Router()

const rota = axios.create({
    baseURL : 'http://api.weatherapi.com/v1',
})

server.get('/climaAtual/:estado', async (req,resp) => {
    const { estado : nome } = req.params
    try {
        const chamada = await rota.get(`/current.json?key=cd505201f6524c0abe0173741230304&q=${nome}&lang=pt`)
        resp.send(chamada.data)
    } catch (error) {
        resp.status(404).send ({
            erro: error.message
        })
    }
})

server.get('/climaAtual/consultaPrevisao/:lugar/:dias', async(req,resp) => {
    try {
        const {lugar, dias} = req.params
        const info = await rota.get(`/forecast.json?key=cd505201f6524c0abe0173741230304&q=${lugar}&days=${dias}&lang=pt`)
        resp.send({
            info : info.data
        })

    } catch (error) {
        resp.status(404).send({
            erro: error.message
        })
    }
})




export default server;
