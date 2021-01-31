const mysql = require('mysql')
const urlAtual = "localhost.com:3000"

class conexaoMySql{

    constructor(){
        this.conexao = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'damit',
            database: 'node'
        })
    }
  
    read(req,res,table){

        if(!req.params.id){
                this.conexao.query("select * from " + table,function(erro,resultados,campos){
                    res.render('consultar',{data:resultados})
            })
           
        }else{
            this.conexao.query("select * from  " + table + " where id=?",[req.params.id],function(erro,resultados,campos){
                res.render('formConsulta',{data:resultados})
        })
    }
    }

    create(req,res){
        this.conexao.query("insert into user values (?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.nome,req.body.endereco,req.body.telefone,req.body])
        res.render('controllerForm',{name: req.body.name})
    }

    delete(req,res)
    {
        this.conexao.query("delete from empresa where id=?",[req.params.id]) 
        res.render('deletar') 
    }

    update (req,res,controller=null){
        {   
            if(controller==null){
                
                this.conexao.query("SELECT * from empresa where id=?",[req.params.id], function(erro, resultados, campos){
                    res.render('update',{id:req.params.id,empresa:resultados[0].empresa,cnpj:resultados[0].cnpj})
                }) 
            }else{
                this.conexao.query("update empresa set empresa=?, cnpj=? where id=?",[req.body.empresa,req.body.cnpj,req.body.id])
                res.render('controllerUpdate')
            }
        }
    }
}

module.exports=conexaoMySql

