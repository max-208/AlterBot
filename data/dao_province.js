const db = require('./sqlite_connection');
var provinceDAO = function(){

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
            const querry = "insert into province ( IdProvince, NomProvince, ProprietaireProvince) values (?,?,?)";
            db.run(querry,[values["IdProvince"], values["NomProvince"], values["ProprietaireProvince"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.update = function(values){
        return new Promise(async function(resolve,reject){
            const querry = "update province set NomProvince = ?, ProprietaireProvince = ?, where IdProvince = ? ";
            db.all(querry,[values["NomProvince"], values["ProprietaireProvince"], values["IdProvince"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.delete = async function(key){
        return new Promise(async function(resolve,reject){
            const query = "delete from province where IdProvince = ? ";
            db.run(query,key,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.find = function(key){
        return new Promise(async function(resolve,reject){
            const query = "select * from province where IdProvince = ?";
            db.get(query,key,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
};
const dao = new provinceDAO();
module.exports = dao;
