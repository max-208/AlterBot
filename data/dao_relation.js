const db = require('./sqlite_connection');
var relationDAO = function(){

    this.findAll = async function(){
        return new Promise(async function(resolve,reject){
            const query = "select * from relation";
            db.all(query,[],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    
    this.insert = async function(values){
        return new Promise(async function(resolve,reject){
            const querry = "insert into relation ( Emmetteur, Recepteur, Statut, Commentaire) values (?,?,?,?)";
            db.run(querry,[values["Emmetteur"], values["Recepteur"],values["Statut"], values["Commentaire"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.update = function(values){
        return new Promise(async function(resolve,reject){
            const querry = "update relation set Statut = ?, Commentaire = ?, where Emmetteur = ? and Recepteur = ? ";
            db.all(querry,[values["Statut"], values["Commentaire"], values["Emmetteur"], values["Recepteur"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.delete = async function(user1,user2){
        return new Promise(async function(resolve,reject){
            const query = "delete from relation where Emmetteur = ? and Recepteur = ?";
            db.get(query,[user1,user2],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.find = function(user1,user2){
        return new Promise(async function(resolve,reject){
            const query = "select * from relation where Emmetteur = ? and Recepteur = ?";
            db.get(query,[user1,user2],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
};
const dao = new relationDAO();
module.exports = dao;
