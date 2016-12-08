const express = require('express')
const Openpay = require('openpay')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 8080 

const openpay = new Openpay('mghu5rdshfetmetuepbv', 'sk_89848887b87249fb99572b7d12f3a0d5');
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('template'))

//Peticiones
app.get('/', function (req,res) {
  res.status(200).sendFile(__dirname + "index.html")
})

app.post('/charges', function (req,res) {
  var chargeRequest = req.body

  if(chargeRequest !== undefined) {

    openpay.charges.create(chargeRequest, function(error,charge){  
      if (error) {
        console.log(error)
        res.status(200).json({message:'producto fue recibido con error',product:chargeRequest})
      }else{
        console.log(charge)
        res.status(200).json({message:'generando el cargo ' + charge})
      }
    })
  }else{
      res.status(404).json({message: 'error al recibir al cliente',type: `chargeRequest :  ${chargeRequest} `
    })
  }  

})

//App listen
app.listen(port, function (err) {
  if (err) {
    res.status(500).json({err:err})
    console.log(`Ha ocurrido el siguiente error : ${err}`)
  }else{
    console.log(`Escuchando en puerto : ${port}`)
  }
})