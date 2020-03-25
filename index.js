const Discord = require('discord.js');
const client = new Discord.Client();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/users";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var emotes = ['','','',''];
var a = [];
var emotesMatrice = [[],[],[],[]];
var tempPoints = 0;
var winningEmote;
var identifier;
var userPoints;

function decideEmote(){
    var i;
    for (i = 0; i < 4; i++){
        a[i] = Math.floor(Math.random() * 11);

        if (a[i] === 1){
            emotes[i] = "<:nice:685876723480657931>";
        } else if (a[i] === 2){
            emotes[i] = "<:rife:684891872325402636>";
        } else if (a[i] === 3){
            emotes[i] = "<:caroline:683733015012048920>";
        } else if (a[i] === 4){
            emotes[i] = "<:edible:679489059026239490>";
        } else if (a[i] === 5){
            emotes[i] = "<:life_pain:642171471057256458>";
        } else if (a[i] === 6){
            emotes[i] = "<:john:631280524048072714>";
        } else if (a[i] === 7){
            emotes[i] = "<:npman:629740585737256991>";
        } else if (a[i] === 8){
            emotes[i] = "<:Purple_Narwhal:628896854918168586>";
        } else if (a[i] === 9){
            emotes[i] = "<:Narwhal_2:628896800299941914>";
        } else if (a[i] === 10){
            emotes[i] = "<:Blue_Narwhal:628896758944235520>";
        } else {
            emotes[i] = "<:life_pain:642171471057256458>";
        }

    }

    message = emotes[0] + ' ' + emotes[1] + ' ' + emotes[2] + ' ' + emotes[3];
    console.log(message);
}

function getUserPoints(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        var query = { userID: identifier };
        dbo.collection("customers").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            userPoints = result[2]
            db.close();
        });
    });
}

function addPoints() {
    //find the emoji and then add points to the user who sent the message
    if (winningEmote === "<:nice:685876723480657931>"){
        tempPoints = tempPoints + 69;
    } else if (winningEmote === "<:rife:684891872325402636>"){
        tempPoints = tempPoints + 420;
    } else if (winningEmote === "<:caroline:683733015012048920>"){
        tempPoints = tempPoints + 67;
    } else if (winningEmote === "<:edible:679489059026239490>"){
        tempPoints = tempPoints 
        msg.channel.send('HAHA GET F*CKED');
    } else if (winningEmote === "<:life_pain:642171471057256458>"){
        tempPoints = tempPoints + 42;
    } else if (winningEmote === "<:john:631280524048072714>"){
        tempPoints = tempPoints + 100;
    } else if (winningEmote === "<:npman:629740585737256991>"){
        tempPoints = tempPoints + 13;
    } else if (winningEmote === "<:Purple_Narwhal:628896854918168586>"){
        tempPoints = tempPoints + 16;
    } else if (winningEmote === "<:Narwhal_2:628896800299941914>"){
        tempPoints = tempPoints + 12;
    } else if (winningEmote === "<:Blue_Narwhal:628896758944235520>"){
        tempPoints = tempPoints + 50;
    }

    getUserPoints();

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        var user = { userID: identifier, points: tempPoints + userPoints };
        dbo.collection("points").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("points have been added");
            db.close();
        });
    });
}

function checkAcc(){
    if (emotesMatrice[0][0] === emotesMatrice[0][1] && emotesMatrice[0][1] === emotesMatrice[0][2] && emotesMatrice[0][2] === emotesMatrice[0][3]){
        winningEmote = emotesMatrice[0][0];
        addPoints();
    } else if (emotesMatrice[1][0] === emotesMatrice[1][1] && emotesMatrice[1][1] === emotesMatrice[1][2] && emotesMatrice[1][2] === emotesMatrice[1][3]){
        winningEmote = emotesMatrice[1][0];
        addPoints();
    } else if (emotesMatrice[2][0] === emotesMatrice[2][1] && emotesMatrice[2][1] === emotesMatrice[2][2] && emotesMatrice[2][2] === emotesMatrice[2][3]){
        winningEmote = emotesMatrice[2][0];
        addPoints();
    } else if (emotesMatrice[3][0] === emotesMatrice[3][1] && emotesMatrice[3][1] === emotesMatrice[3][2] && emotesMatrice[3][2] === emotesMatrice[3][3]){
        winningEmote = emotesMatrice[3][0];
        addPoints();
    } else {
        console.log('loser detected!');
    }
}

function checkVert(){
    if (emotesMatrice[0][0] === emotesMatrice[1][0] && emotesMatrice[1][0] === emotesMatrice[2][0] && emotesMatrice[2][0] === emotesMatrice[3][0]){
        winningEmote = emotesMatrice[0][0];
        addPoints();
    } else if (emotesMatrice[0][1] === emotesMatrice[1][1] && emotesMatrice[1][1] === emotesMatrice[2][1] && emotesMatrice[2][1] === emotesMatrice[3][1]){
        winningEmote = emotesMatrice[0][1];
        addPoints();
    } else if (emotesMatrice[0][2] === emotesMatrice[1][2] && emotesMatrice[1][2] === emotesMatrice[2][2] && emotesMatrice[2][2] === emotesMatrice[3][2]){
        winningEmote = emotesMatrice[0][2];
        addPoints();
    } else if (emotesMatrice[0][3] === emotesMatrice[1][3] && emotesMatrice[1][3] === emotesMatrice[2][3] && emotesMatrice[2][3] === emotesMatrice[3][3]){
        winningEmote = emotesMatrice[0][3];
        addPoints();
    } else {
        console.log('loser detected!');
    }
}

function checkDiag(){
    if (emotesMatrice[0][0] === emotesMatrice[1][1] && emotesMatrice[1][1] === emotesMatrice[2][2] && emotesMatrice[2][2] === emotesMatrice[3][3]){
        winningEmote = emotesMatrice[0][0];
        addPoints();
    } else if (emotesMatrice[0][3] === emotesMatrice[1][2] && emotesMatrice[1][2] === emotesMatrice[2][1] && emotesMatrice[2][1] === emotesMatrice[3][0]){
        winningEmote = emotesMatrice[0][3];
        addPoints();
    } else {
        console.log('loser detected!');
    }
}

client.on('message', msg => {
    if (msg.content === '!slots') {
        identifier = msg.member.id;
        var i;
        for (i = 0; i < 4; i++){
            decideEmote();
            emotes = emotesMatrice[i];
            msg.channel.send(message);
        }
    checkAcc();
    checkVert();
    checkDiag();
    addPoints();
    msg.channel.send('adding '+ tempPoints + ' points for <@' + identifier + '>');
    tempPoints = 0;
    }
  });

client.login('redacted');