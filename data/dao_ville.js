const db = require('./sqlite_connection');
var villeDAO = function(){

    this.findAll = async function(){
        return new Promise(async function(resolve,reject){
            const query = "select * from province";
            db.all(query,[],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    
    this.insert = async function(values){
        return new Promise(async function(resolve,reject){
            const querry = "insert into ville ( IdVille, NomVille, ProprietaireVille, LaProvince) values (?,?,?,?)";
            db.run(querry,[values["IdVille"],values["NomVille"], values["ProprietaireVille"], values["LaProvince"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.update = function(values){
        return new Promise(async function(resolve,reject){
            const querry = "update ville set NomVille = ?, ProprietaireVille = ?, LaProvince = ?, where IdVille = ? ";
            db.all(querry,[values["NomVille"], values["ProprietaireVille"], values["LaProvince"], values["IdVille"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.delete = async function(key){
        return new Promise(async function(resolve,reject){
            const query = "delete from ville where IdVille = ? ";
            db.run(query,key,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.find = function(key){
        return new Promise(async function(resolve,reject){
            const query = "select * from ville where IdVille = ?";
            db.get(query,key,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
};
const dao = new villeDAO();
module.exports = dao;
