const express = require('express')
const Openpay = require('openpay')
const bodyParser = require('body-parser')
const port = 8080 || process.env.PORT

const openpay = new Openpay('mghu5rdshfetmetuepbv', 'sk_89848887b87249fb99572b7d12f3a0d5');
const app = express()


//Middleware de control de acceso
app.use( (req,res,next)=> {
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
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Peticiones

app.get('/', (req,res) => {
  res.status(200).send('server')
})

app.post('/charges', (req,res,err) => {
  var chargeRequest = {
     'source_id' : token_id,
     'method' : 'card',
     'amount' : amount,
     'description' : description,
     'device_session_id' : device_session_id,
     'customer' : {
          'name' : name,
          'last_name' : last_name,
          'phone_number' : phone_number,
          'email' : email
     }
  } 
  openpay.charges.create(chargeRequest, function(error, charge) {
    if (error){

    };
  });  
  res.status(200).json({hola:'hola'})
  console.log("worked it")
})

//App listen
app.listen(port, (err) => {
  if (err) {
    res.status(500).json({err:err})
    console.log(`Ha ocurrido el siguiente error : ${err}`)
  }else{
    console.log(`Escuchando en puerto : ${port}`)
  }
})