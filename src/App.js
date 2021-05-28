import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin'

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App(){

    const [coins,setCoins] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res=>{
            setCoins(res.data)
        }).catch(error =>console.log("error"))
    },[]);

    const handelChange = e =>{
        setSearch(e.target.value)
    }

    const filterCoins = coins.filter(coin=>coin.name.toLowerCase().includes(search.toLocaleLowerCase()))

    return(
        <div className="coin-app">
            <div className="coin-search">
                <h1 className="coin-text">Search a currency</h1>
                <form>
                <input type="text" placeholder="Search" className="coin-input" onChange={handelChange}/>
                </form>
            </div>
            {filterCoins.map(coin=>{
                return  <Coin 
                key={coin.id} 
                name={coin.name} 
                image={coin.image}
                symbol={coin.symbol}
                volume={coin.market_cap}
                price={coin.current_price}
                />
            })}
        </div>
    )
}

export default App;