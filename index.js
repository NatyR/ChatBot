//Adicionando os pacotes ao arquivo (index.js)
var restify = require('restify');
var builder = require('botbuilder');

//Configurando a porta em que o projeto irá se conectar
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s Servidor em  %s', server.name, server.url);
});

//Criando um conector com o Bot Framework
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Criando 2 ActionS: POST para receber as mensagens dos usuários e
//e outra action com um request para que o Bot interaja com os usuário
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session){
    session.send("Você disse: %s", session.message.text);
});





