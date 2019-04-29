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
    appId: '',
    appPassword: ''
});

//Criando 2 Actions: POST para receber as mensagens dos usuários e
//e outra action com um request para que o Bot interaja com os usuário
server.post('/api/messages', connector.listen());


//Função inicial apenas para o Bot repetir o conteúdo digitado
/*var bot = new builder.UniversalBot(connector, function (session){
    session.send("Você disse: %s", session.message.text);
});*/
const bot = new builder.UniversalBot(connector);

//Bloco de Diálogos
bot.dialog("/", [session => {
    builder.Prompts.text(session, "Olá, como vc se chama?");
}, (session, results) => {
    let nome = results.response;
    session.send(`Olá, ${nome}`);
    session.beginDialog("/perguntarSaborPizza");
}]);

bot.dialog("/perguntarSaborPizza", [session => {
    builder.Prompts.text(session, "Qual o sabor de Pizza que deseja pedir?");
}, (session, results) => {
    let saborPizza = results.response;
    session.endDialog(`Puxa que legal! Então vc gosta de comer pizza de ${saborPizza}! Este é um dos sabores que saem com frequência aqui :)`);
    session.beginDialog("/perguntarCepCliente");
}]);

bot.dialog("/perguntarCepCliente", [session => {
    builder.Prompts.text(session, "Qual o CEP para entrega da melhor pizza que comerá hj?");
}, (session, results) => {
    let CEP = results.response;
    session.endDialog(`Certo, estamos quase finalizando`);
    session.beginDialog("/perguntarFormaPagamento");
}]);

bot.dialog("/perguntarFormaPagamento", [session => {
    builder.Prompts.text(session, "Qual forma de pagamento vc prefere?");
}, (session, results) => {
    let formaPgmt = results.response;
    session.endDialog(`Certo, então a forma de pagamento escolhida será então ${formaPgmt}.`);
    session.beginDialog("/finalizarAtendimento");
}]);

bot.dialog("/finalizarAtendimento", [session => {
    builder.Prompts.text(session, "Seu pedido foi finalizado! Sua deliciosa pizza chegará entre 30-40 min e já estamos confeccionando ela pra vc recebê-la quentinha em sua casa viu?!");
}, (session, results) => {
    session.endDialog(`Qualquer dúvida poderá retornar aqui ou ligar para (11)4747-9861. Obrigada!!`);
}]);










