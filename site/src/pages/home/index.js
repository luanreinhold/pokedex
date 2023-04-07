import './index.scss'
import '../../common/index.css'
import { testePokemon } from '../../api/config.js'
import { useEffect, useState } from 'react'

import axios from 'axios';

export default function Home() {

    const [infoPokemon, setInfoPokemon] = useState();
    const [inputNome, setInputNome] = useState('1')
    const [nome, setNome] = useState()
    const [urlImagem, setUrImagem] = useState('')
    const [id, setId] = useState('')
    const [altura, setAltura] = useState('')
    const [largura, setLargura] = useState('')
    const [habitat, setHabitat] = useState('')
    const [tipo, setTipo] = useState('')
    const [texto, setText] = useState('');
    const [texto2, setText2] = useState('');

    const [firstLoad, setFirstLoad] = useState(true);

    async function chamadaApi () {
        try {
            const dados = await axios.get(`http://localhost:3030/consulta/pokemon/${inputNome}`)
            renderizarPokemon(dados.data)
            setFirstLoad(false)
        } catch (error) {
            console.log(error.message)
        }
    }


    

    const getSpecies  = async () => {
        try {
            const dados = await axios.get(`http://localhost:3030/consulta/pokemon/species/${inputNome}`)
            renderizarSpecies(dados.data)
          

        } catch (error) {
            console.log(error.message)
        }
    }
 



    
   
    const procura = async () => {
        await chamadaApi()
        await getSpecies()
    }

    async function renderizarPokemon(pokemonDados) {
        setNome(pokemonDados.retorno.name)
        setUrImagem(pokemonDados.retorno['sprites']['versions']['generation-v']['black-white']['animated']['front_default'])
        setAltura(pokemonDados.retorno.height)
        setLargura(pokemonDados.retorno.weight)
        setId(pokemonDados.retorno.id)
        setTipo(pokemonDados.retorno['types'][0]['type']['name'])
    }

    const renderizarSpecies = async (dadosEspecie) => {
        setText(dadosEspecie['flavor_text_entries']['0']['flavor_text'])
        setText2(dadosEspecie['flavor_text_entries']['3']['flavor_text'])
        setHabitat(dadosEspecie['habitat']['name'])
        console.log(dadosEspecie)
    }

    return (
        <main className='Home flexbox-column'>
            <div className="pokemon-box">
                <div className="pokemon-side-information adjust-left">
                    <p className='align-items-center'>{texto2 ? texto2 : 'Projeto Pokedex!'}</p>
                </div>
                <div className="pokemon-card align-items-center">
                    {
                        firstLoad == true &&
                            <img src="./src/images/FreeVector-Poke-Ball.png" alt="" />
                    }
                    {
                        firstLoad == false &&
                            <div className="pokemon-information">
                                <img  src={urlImagem} alt="" />
                                <div className="agrupamento">
                                     <h3>{nome}</h3> <p>{id}</p> 
                                </div>
                                <div className="agrupamentoLabel">                                
                                    <span className='box-information'>{tipo}</span>
                                    <span className='box-information'> {habitat}</span>
                                </div>
                                <div className="agrupamentoLabel">
                                    <span className='box-information'>alt: {altura}</span>
                                    <span className='box-information'>lar: {largura}</span>    
                                </div>
                            </div>                    
                    }
                 
                </div>
                <div className="pokemon-side-information adjust-right">
                    <p className='align-items-center'>{texto ? texto2 : 'Projeto Pokedex!' }</p>
                </div>
            </div>

            <div className="container-pokemons">
                <div className="border-left-top"></div>
                <div className="pesquisa align-items-center">
                    <input type="text align-items-center" value={inputNome} onChange={e => setInputNome(e.target.value)} placeholder='pesquise aqui' className="text" />
                    <button placeholder='pesquisar' onClick={procura}>Procurar</button>
                </div>
                <div className="border-left-top"></div>
            </div>
        </main>
    )
}
