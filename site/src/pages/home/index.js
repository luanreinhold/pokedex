import './index.scss'
import '../../common/index.css'
import { testePokemon } from '../../api/config.js'
import { useEffect, useState } from 'react'

import axios from 'axios';

export default function Home() {

    const [infoPokemon, setInfoPokemon] = useState();
    const [inputNome, setInputNome] = useState('')
    const [nome, setNome] = useState()
    const [urlImagem, setUrImagem] = useState('')
    const [id, setId] = useState('')
    const [altura, setAltura] = useState('')
    const [largura, setLargura] = useState('')
    const [habitat, setHabitat] = useState('')
    const [tipo, setTipo] = useState('')
    const [texto, setText] = useState('');
    const [texto2, setText2] = useState('');
    const [evolucaoPassada, setEvolucaoPassada] = useState() 

    const [erro, setErro] = useState('')
    let mensagem = 'Projeto Pokedex!\n by: Luan Reinhold'

    //- render todop pokemons
    const [pokemons, setPokemons] = useState([])
    const [pokemonCarregado, setPokemonCarregado] = useState([])

    //-
    const [pokemonFiltrado, setPokemonFiltrado] = useState([])
    const [firstLoad, setFirstLoad] = useState(true);
    const [exibirFiltrado, setExibirFiltrado] = useState(false);

    //-input de pesquisa
    const [elementInput, setElementoInput] = useState('')

    async function chamadaApi () {
        try {
            const dados = await axios.get(`http://localhost:3030/consulta/pokemon/${inputNome.toLowerCase()}`)
            renderizarPokemon(dados.data)
            setFirstLoad(false)
            setErro('')
        } catch (error) {
            console.log(error.message)
            setErro('Pokemon não existente!')
        }
    }

    const getSpecies  = async () => {
        try {
            const dados = await axios.get(`http://localhost:3030/consulta/species/${inputNome.toLowerCase()}`)
            renderizarSpecies(dados.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    // endpoint faz a consulta e retorna o nome de x numero de pokemons,
    // e então passa para a função carregaUm um array de objetos com os nomes
    async function carregarTodos () {
        try {
            const dados = await axios.get(`http://localhost:3030/consulta/pokemon`)
            carregaUm(dados.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    // essa função percorre o array com um for chamando a api para
    // fazer uma consulta individual carregando as informações
    async function carregaUm (pokemons) {
        try {
            const ar = [];
            for(let i = 0; i < pokemons.length; i++) {
                const p = await axios.get(`http://localhost:3030/consulta/pokemon/${pokemons[i].name}`)
                ar.push(p.data)
            }
            setPokemonCarregado(ar);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        carregarTodos()
      
        console.log(pokemonCarregado)
        
    }, [])

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
    }

    function filtrarPokemonNome(tipo) {
        const novoPoke = pokemonCarregado.filter(pokemon => pokemon['retorno']['types'][0]['type']['name'] === tipo);
        console.log(novoPoke);
        setPokemonFiltrado(novoPoke);
        setExibirFiltrado(true)
    }

 


    return (
        <main className='Home font flexbox-column'>
            <div className="pokemon-box">
                <div className="pokemon-side-information adjust-left">
                    <p className='align-items-center'>{texto2 ? texto2 : mensagem}</p>
                </div>
                <div className="pokemon-card align-items-center">
                    {
                        firstLoad == true &&
                            <img src="./src/images/FreeVector-Poke-Ball.png" alt="" />
                    }
                    {
                        firstLoad == false &&
                            <div className="pokemon-information">
                                <img src={urlImagem} alt="Imagem de pokemon não disponível" />
                                
                                <div className="agrupamento font-color-white">
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
                    <p className='align-items-center'>{texto ? texto : 'Projeto Pokedex!\nby:Luan Reinhold' }</p>
                </div>
            </div>

     
            
            <div className="container-pokemons">
                   
                <div className="pesquisa align-items-center">
                     {erro}
                    <input type="text align-items-center" value={inputNome} onChange={e => setInputNome(e.target.value)} placeholder='pesquise aqui' className="text" />
                    <button placeholder='pesquisar' onClick={procura}>Procurar</button>
                </div>
       
            </div>
            
            {/* <div className="containerDivisor"></div> */}
            
            <div className="optionsContainer">
                    
                    <div className="buttonsContainer">
                    <h3 className='font-color-white'>Filtre por elemento: </h3>
                    <button className='filtroOption' onClick={() => setExibirFiltrado(false)}>resetar</button>
                    <div className="flexbox-column">
                        <button className='filtroOption' onClick={() => filtrarPokemonNome('fire')}>fogo</button>
                        <button className='filtroOption' onClick={() => filtrarPokemonNome('water')}>agua</button>
                    </div>
                    <div className="flexbox-column">
                        <button className='filtroOption' onClick={() => filtrarPokemonNome('fighthing')}>lutador</button>
                        <button className='filtroOption' onClick={() => filtrarPokemonNome('flying')}>voador</button>
                    </div >
                    <div className='flexbox-column'>
                        <button className='filtroOption' onClick={() => filtrarPokemonNome('poison')}>venenoso</button>
                        <button className='filtroOption' onClick={() => filtrarPokemonNome('rock')}>pedra</button>
                    </div>
                    
                    
                    </div>

                    {/* <input type="text" placeholder='elemento' value={elementInput} onChange={e => setElementoInput(e.target.value)} />
                    {elementInput} */}
            </div>
            <div className="container-Monstruario">
                {exibirFiltrado == false &&
                <div className='agrup'>
                         {pokemonCarregado.map ( pokemon => 
                            <div className="pokemon-div-info">
                                <div className="agrupamento">
                                    <p><b>{pokemon.retorno.name}</b></p>
                                    <p>{pokemon.retorno.id}</p>
                                </div>
                                <img src={pokemon.retorno['sprites']['front_default']}></img>
                            </div>    
                        )} 
                </div>
                } 
                
                {exibirFiltrado == true &&
                    <div className='agrup'>
                          {pokemonFiltrado.map ( pokemon => 
                            <div className="pokemon-div-info">
                                <div className="agrupamento">
                                    <p><b>{pokemon.retorno.name}</b></p>
                                    <p>{pokemon.retorno.id}</p>
                                </div>
                                <img src={pokemon.retorno['sprites']['front_default']}></img>
                            </div>    
                        )} 
                    </div> 
                }
                
               
               
    

         
            </div>
            
          
        </main>
    )
}
