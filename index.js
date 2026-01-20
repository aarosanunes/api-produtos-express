// importar modulo express 
const express = require('express');
// inicializei uma nova aplicação chamada "app"
const app = express();
// configuirei o formato pra troca de dados como json
app.use(express.json());
// defini a porta "3000" como a portão padrão aqui da aplicação
const port = 3000; 

/* Criado uma array de produtos, onde cada item da array é um objeto
com as propriedades (id, nome, preço).
*/
const produtos = [
    {id: 1, nome: 'produto A', preco: 10.0},
    {id: 2, nome: 'produto B', preco: 20.0}
];


/*Manipulador de requisições do tipo "get" para este caminho na API "/produtos"
implementando uma função para quando o cliente mandar uma requisição do tipo "get"
será executada e dentro desta função será retornado toda lista em formato JSON 
OBS: lembrando de retornar com o status de código correto >>> "200".
significando que a requisoção foi atendida com sucesso! 
*/

app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

/*O segundo Endpoint será do tipo "post" vai ser utilizado quando o cliente
quiser mandar dados para criar um novo produto na aplicação. */
app.post('/produtos', (req, res) => {
        /*Desta requisição enviada pelo cliente irei pegar o corpo desta requisição 
        sendo "req.body" que irá ter os dados que foram enviados pelo cliente
        será guardada em uma variavel chamada "novoProduto" */
        const novoProduto = req.body;
        /*sendo uma id gerada de forma automatica então o cliente 
        enviara isso na requisição, enviara somente nome e preço do produto 
        será verificado tamanho do array do produto, se houver um produto ja cadastrado
        utilizando um operador ternario, será pego o id do ultimo elemento e incrementar em 1
        mas se não houver nenhum produto cadastrado e o lenght retornar zero, será definido 
        valor 1 para o id, pois será o id 1 do novo produto.*/
        novoProduto.id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1; 
        // Sendo dado um push puxando o novo produto que veio da requisição do cliente.
        produtos.push(novoProduto);
        /* retornando uma resposta ao cliente utilizando um código de status adequado, sendo "201"
        mostrando assim que um recurso novo foi criado na aplicação.
        */
        res.status(201).json(novoProduto);
});
/* inicializando o servidor, chamando o metodo "listen", passando a porta 
onde o servidor irá escutar requisições, imprimindo a mesagem no console 
informando URL e a porta onde a aplicação está
*/ 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
