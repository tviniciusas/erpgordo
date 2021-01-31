const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()
const urlencondeParser = bodyParser.urlencoded({extended:false})
const PORT = 3001
const conexaoMySql = require('./conexao')
let conexao = new conexaoMySql
const urlAtual = "localhost.com:3000"

app.listen(PORT,function(req,res){

    console.log("Servidor rodando 100%")
    console.log("http://localhost.com:" + PORT )

})
//Template engine
app.engine("handlebars",handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.use('/css',express.static('css'))
app.use('/js',express.static('js'))
app.use('/img',express.static('img'))
//Routes and templates
app.get("/",function (req,res) {res.render('index')})
//Insert in tables
app.get("/inserir",function (req,res) {res.render('inserir')})
app.post("/controllerForm",urlencondeParser,function(req,res){conexao.create(req,res)})
//select in tables
app.get("/consultar/:id?",function (req,res){conexao.read(req,res,"empresa")})
//delete in tables
app.get("/deletar/:id",function (req,res){conexao.delete(req,res)})
//update tables
app.get("/update/:id",function (req,res) {res.render('update')})
app.post("/controllerUpdate", urlencondeParser, function(req,res){conexao.update(req,res,'controllerUpdate')})

