const express = require('express')

const mongoose = require('mongoose')

const productModel = require('./models')




const app = express()

const cors = require('cors')

const PORT = process.env.PORT || 8000



app.use(express.json())
app.use(cors())



const base_url = 'mongodb+srv://jehanzeb:034520775120336290265903332224351@cluster1.vvrsq3v.mongodb.net/test'


mongoose.connect(base_url)
.then((res)=>{
console.log("mongodb connected")
})
.catch((err)=>{
    console.log('error',err)
})





app.post('/', (req, res) => {
    console.log('body ', req.body);


    const newCategory = req.body.categoryName
    const amount = req.body.amount
    const name = req.body.name


    const items = new productModel({newCategory,amount,name})



    productModel.create(req.body, (error, data) => {
        if (error) {
            res.json({
                message: error,
                
            })
        }
        else {
            res.json({
                // message: 'Create product',
                items
            })
            console.log(data)
        }
    })
})








app.get('/', (req, res) => {

productModel.find({},(err,data)=>{

    if (err) {
        res.json({
            message: `error ${err}`
        })
    }
    else {
        res.json({
            data,
        })
    }


})

})


app.delete('/:id', (req, res) => {

    const { id } = req.params

    productModel.findByIdAndDelete(id, (err, data) => {
        if (err) {
            res.json({
                message: `error ${err}`
            })
        }
        else {
            res.json({
                data,
            })
        }
    })

})


app.put('/', (req, res) => {

    const id = req.body.id

    
    productModel.findByIdAndUpdate(id, req.body, {new: true}, (err, data) => {
        if (err) {
            res.json({
                message: `error ${err}`
            })
        }
        else {
            res.json({
                data,
            })
        }
        console.log(data)
    })
    
})


















app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
})