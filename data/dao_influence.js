const db = require('./sqlite_connection');
var provinceDAO = function(){

    this.findAll = async function(){
        return new Promise(async function(resolve,reject){
            const query = "select * from influence";
            db.all(query,[],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    
    this.insert = async function(values){
        return new Promise(async function(resolve,reject){
            const querry = "insert into influence ( VilleInfluencee, JoueurInfluencant, InfluenceReligieuse, InfluenceEconomique) values (?,?,?,?)";
            db.run(querry,[values["VilleInfluencee"], values["JoueurInfluencant"],values["InfluenceReligieuse"], values["InfluenceEconomique"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.update = function(values){
        return new Promise(async function(resolve,reject){
            const querry = "update influence set InfluenceReligieuse = ?, InfluenceEconomique = ?, where VilleInfluencee = ? and JoueurInfluencant = ? ";
            db.all(querry,[values["InfluenceReligieuse"], values["InfluenceEconomique"], values["VilleInfluencee"], values["JoueurInfluencant"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.delete = async function(ville,joueur){
        return new Promise(async function(resolve,reject){
            const query = "delete from influence where VilleInfluencee = ? and JoueurInfluencant = ?";
            db.get(query,[ville,joueur],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.find = function(ville,joueur){
        return new Promise(async function(resolve,reject){
            const query = "select * from influence where VilleInfluencee = ? and JoueurInfluencant = ?";
            db.get(query,[ville,joueur],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
};
const dao = new provinceDAO();
module.exports = dao;
