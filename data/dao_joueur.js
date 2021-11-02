const db = require('./sqlite_connection');
var joueurDAO = function(){

    this.findAll = async function(){
        return new Promise(async function(resolve,reject){
            const query = "select * from joueur";
            db.all(query,[],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    
    this.insert = async function(values){
        return new Promise(async function(resolve,reject){
            const querry = "insert into joueur ( IdJoueur, NomPays, RegimePays, DevisePays, DrapeauPays, PointMouvement, Armee, Marine, Science, Culture, Religion, Economie, Territoire ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.run(querry,[values["IdJoueur"], values["NomPays"], values["RegimePays"], values["DevisePays"], values["DrapeauPays"], values["PointMouvement"], values["Armee"], values["Marine"], values["Science"], values["Culture"], values["Religion"], values["Economie"], values["Territoire"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.update = function(values){
        return new Promise(async function(resolve,reject){
            const querry = "update joueur set NomPays = ?, RegimePays = ?, DevisePays = ?, DrapeauPays = ?, PointMouvement = ?, Armee = ?, Marine = ?, Science = ?, Culture = ?, Religion = ?, Economie = ?, Territoire = ? where IdJoueur = ? ";
            db.all(querry,[ values["NomPays"], values["RegimePays"], values["DevisePays"], values["DrapeauPays"], values["PointMouvement"], values["Armee"], values["Marine"], values["Science"], values["Culture"], values["Religion"], values["Economie"], values["Territoire"], values["IdJoueur"]],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.delete = async function(key){
        return new Promise(async function(resolve,reject){
            const query = "delete from joueur where IdJoueur = ? ";
            db.run(query,key,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.find = function(key){
        return new Promise(async function(resolve,reject){
            const query = "select * from joueur where IdJoueur = ?";
            db.get(query,key,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
};
const dao = new joueurDAO();
module.exports = dao;
