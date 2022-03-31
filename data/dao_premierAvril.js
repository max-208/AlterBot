const db = require('./sqlite_connection');
var premierAvril_dao = function(){

    this.getScoreboard = async function(page,numByPage = 10){
        return new Promise(async function(resolve,reject){
            const query = "select * from a_user order by UserScore DESC limit ? offset ?";
            db.all(query,[numByPage,page*numByPage],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.getLastSentVotes = async function(userID){
        return new Promise(async function(resolve,reject){
            const query = "select * from a_vote where voteUser = ? limit 5";
            db.all(query,[userID],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.getLastRecievedVotes = async function(userID){
        return new Promise(async function(resolve,reject){
            const query = "select * from a_vote where voteReciever = ? limit 5";
            db.all(query,[userID],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.CreateUser = async function(userID,weight){
        return new Promise(async function(resolve,reject){
            const querry = "insert into a_user ( IdUser, Weight) values (?,?)";
            db.run(querry,[userID,weight],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.getUser = async function(userID){
        return new Promise(async function(resolve,reject){
            const query = "select * from a_user where IdUser = ?";
            db.get(query,userID,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.createMessage = async function(messageID){
        return new Promise(async function(resolve,reject){
            const query = "insert into a_message ( IdMessage ) values (?)";
            db.run(query,messageID,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.getMessage = async function(messageID){
        return new Promise(async function(resolve,reject){
            const query = "select * from a_message where IdMessage = ?";
            db.get(query,messageID,(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.vote = async function(userID,messageID,recieverID,ChannelID,vote){
        return new Promise(async function(resolve,reject){
            
            let query = "insert into a_vote (voteUser,voteMessage,voteReciever,voteChannel,voteScore) values (?,?,?,?,?)";
            await db.run(query,[userID,messageID,recieverID,ChannelID,vote],(err,rows)=>{
                if(err)reject(err);
                //resolve(rows)
            });
            query = "update a_message SET MessageScore = MessageScore + ? WHERE IdMessage = ?";
            await db.run(query,[vote,messageID],(err,rows)=>{
                if(err)reject(err);
                //resolve(rows)
            });
            query = "update a_user SET UserScore = UserScore + ? where IdUser = ?";
            await db.run(query,[vote,recieverID],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };
    this.removeVote = async function(userID,messageID,recieverID,vote){
        return new Promise(async function(resolve,reject){
            
            let query = "remove from a_vote where voteUser = ? and voteMessage = ?;";
            await db.run(query,[userID,messageID],(err,rows)=>{
                //if(err)reject(err);
                //resolve(rows)
            });
            query = "update a_message SET MessageScores = MessageScore - ? WHERE IdMessage = ?";
            await db.run(query,[vote,messageID],(err,rows)=>{
                //if(err)reject(err);
                //resolve(rows)
            });
            query = "update a_user SET UserScore = UserScore - ? where IdUser = ?";
            await db.run(query,[vote,recieverID],(err,rows)=>{
                if(err)reject(err);
                resolve(rows)
            });
        });
    };

};
const dao = new premierAvril_dao();
module.exports = dao;
