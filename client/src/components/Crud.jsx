import React,{useState,useEffect} from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts,deleteProduct,updateProduct} from '../redux/features/productsSlice'
import axios from 'axios'

const Crud = () => {

const [category,setCategory] = useState('')
const [amount,setAmount] = useState('')
const [name,setName] = useState('')


const [updateCategory,setUpdateCategory] = useState(category)
const [updateAmount,setUpdateAmount] = useState(amount)
const [updatename,setUpdateName] = useState(name)



 const [indexNum,setIndexNum] = useState('')




const dispatch = useDispatch()

const { data, status } = useSelector(state=>state.productsData)

useEffect(()=>{
  dispatch(getProducts())
  
},[])




// console.log(data,'data')



const submitTodo =(e)=>{
  
  e.preventDefault()
  
  
  
  
  axios.post('http://localhost:8000/',{
    category:category,
  amount:amount,
  name:name
  
})


setCategory('')
setAmount('')
setName('')

dispatch(getProducts())
}




// delete




const deleteItem = (_id)=>{
  // console.log(_id)
  dispatch(deleteProduct(_id))

}


const updateItem=(_id)=>{
  console.log(_id,'updated')


  const updateTodo={
    id:_id,
    updateCategory:updateCategory,
    updateAmount:updateAmount,
    updatename:updatename
  }

  dispatch(updateProduct(updateTodo))

setUpdateAmount('')
setUpdateCategory('')
setUpdateName('')


}


return (
  <>
      

<Typography variant='h3' sx={{mt:2}} color='primary'>Todo e-Commerce</Typography>



    <form onSubmit={submitTodo}>
    <Box sx={{mt:3,display:"flex",alignItems:"center",justifyContent:"center"}}>

<input type="text" placeholder='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} style={{padding:'10px',borderRadius:"10px",border:"1px solid black",margin:"10px"}} className="inp" required/>
<input type="number" placeholder='amount' value={amount} onChange={(e)=>{setAmount(e.target.value)}} style={{padding:'10px',borderRadius:"10px",border:"1px solid black",margin:"10px"}} className="inp" required/>
<input type="text" placeholder='product name' value={name} onChange={(e)=>{setName(e.target.value)}} style={{padding:'10px',borderRadius:"10px",border:"1px solid black",margin:"10px"}} className="inp" required/>

    <Button variant="contained" type='submit'>Add</Button>
      </Box>

</form>



<div>

{data.map((val,ind)=>{
// const {amount,category,name,_id} = val

console.log(val,'val')
return(


  
<div key={ind}>
  {val.map((value,index)=>{
return (<Box key={value._id}>
{indexNum === value._id ? (


<section style={{marginTop:"2rem"}}>

<Typography variant='h2' color='secondary'>

</Typography>

<input type="text" placeholder='update category' value={updateCategory} onChange={(e)=>{setUpdateCategory(e.target.value)}} style={{padding:'10px',borderRadius:"10px",border:"1px solid black",margin:"10px"}} className="inp" required/>

<input type="number" placeholder='update amount' value={updateAmount} onChange={(e)=>{setUpdateAmount(e.target.value)}} style={{padding:'10px',borderRadius:"10px",border:"1px solid black",margin:"10px"}} className="inp" required/>

<input type="text" placeholder='update product name' value={updatename} onChange={(e)=>{setUpdateName(e.target.value)}} style={{padding:'10px',borderRadius:"10px",border:"1px solid black",margin:"10px"}} className="inp" required/>

<Button variant='contained' color='primary' onClick={()=>updateItem(value._id)}>Update</Button>

</section>

):(

<Typography variant='h4' color='primary' sx={{m:2}}>{value.category} {value.amount} {value.name}
  
   <Button variant='contained' color='error' onClick={()=>deleteItem(value._id)} sx={{m:2}}>Delete</Button>

   <Button variant='contained' color='secondary' onClick={()=>{setIndexNum(value._id) 
    console.log('edit')}} sx={{m:2}}>Edit</Button>

   </Typography> 


)}


    </Box>)

  })}

</div>

)


})}

</div>
    </>
  )
}

export default Crud
