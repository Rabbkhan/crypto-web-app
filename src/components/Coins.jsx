import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, HStack, Heading, VStack,Image, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'
import CoinCard from './CoinCard'
const Coins = () => {
const [coins, setCoins] = useState([])
const [loading,setLoading] = useState(true);
const[error, setError]= useState(false)
const[page, setpage]= useState(1)
const[currency, setCurrency]= useState('inr')
const currencySymbol = currency ==="inr" ?"₹" : currency ==="eur"?"€" :"$"

const changePage = (page)=>{
  setpage(page)
  setLoading(true);
};
const btns =new Array(132).fill(1)

  useEffect(()=>{
    const fetchCoins = async()=>{
      
      try {
   
        const { data } =  await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoins(data)
      setLoading(false)

      } catch (error) {
        setLoading(false);
        setError(true)

      }


    }
    fetchCoins()
  },[currency,page])

  if(error) return <Error message={"Error While Fetching coins"}/>
  return (
   
    <Container maxW={"container.xl"}>
{loading ? <Loader/> : <>
<RadioGroup value={currency} onChange={setCurrency} p={"8"}>
  <HStack spacing={"4"}>
    <Radio value={"inr"}>₹</Radio>
    <Radio value={"usd"}>$</Radio>
    <Radio value={"eur"}>€</Radio>

  </HStack>
</RadioGroup>
<HStack wrap={"wrap"} justifyContent={"space-evenly"}>

  {coins.map((i)=>(
    <CoinCard 
    key={i.id}
    id={i.id}
    name={i.name}
    price={i.current_price}
    img={i.image}
    symbol={i.symbol}
    currencySymbol={currencySymbol}
    
    
    />

  ))}
</HStack>
<HStack w={"full" } overflowX={"auto"} p={"8"}>
{
  btns.map((item,index)=>(
    // key={item.id}
    <Button 
    key={index}
    bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>
  ))
}
</HStack>

</>}
    </Container>
    )
}


export default Coins



