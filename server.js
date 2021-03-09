const http = require('http');
const express = require('express');
const bodyParser = require ('body-parser');


const app = express();
app.use (bodyParser.json());
const porta = 3000;
app.set('port', porta);


const clientes = [
    {
    id: 1,
    nome: 'Joao',
    email: 'joao@email.com'
    },
    {
    id: 2,
    nome: 'Cristina',
    email: 'cristina@email.com'
    }
]


app.get('/teste', (req, res, next) => {
    res.send(clientes);
});

let contador = clientes.length;
app.post('/clientes', (req, res, next) => {
    clientes.push({id: contador += 1, nome: req.body.nome, email: req.body.email});
    console.log(clientes);
    res.status(201).json(clientes);
})

app.put('/clientes', (req, res, next) => {
    clientes.forEach((cliente) => {
        if(cliente.id === req.body.id){
            cliente.nome = req.body.nome;
            cliente.email = req.body.email;
        }
    })
    res.status(200).json(clientes);
});

app.delete('/clientes', (req, res, next) => {
    clientes.forEach((cliente) => {
        if(cliente.id === req.body.id){
            const index = cliente.indexOf(cliente, 0);
            clientes.splice(index, 1);
        }
        res.status(200).json(clientes);
    })
});



const server = http.createServer(app);
server.listen(3000);



