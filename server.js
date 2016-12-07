const express = require('express')
const Openpay = require('openpay')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 8080 

const openpay = new Openpay('mghu5rdshfetmetuepbv', 'sk_89848887b87249fb99572b7d12f3a0d5');
const app = express()


//Middleware de control de acceso
/*app.use( (req,res,next)=> {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Acess-Control-Allow-Headers',
            'X-Request-With, X-HTTP-Method-Override,Content-Type,Accept');
  if ('OPTIONS' === req.method) {
    res.status(200).end()
  }else{
    next();
  }
})*/
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

  if(chargeRequest) {
      openpay.charges.create(chargeRequest, function(err,charge){
        if (err) {console.log(err)}
        console.log(charge)
      res.status(200).json({message:'producto recibido en el servidor',product:chargeRequest})
      })  
    }else{
    res.status(404).json({
      message: 'error al recibir al cliente',
      type: `chargeRequest :  ${chargeRequest} `
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