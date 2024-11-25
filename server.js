import express from "express"; // Importa o módulo Express para criar a aplicação web
import conectarAoBanco from "./src/config/dbConfig.js"; // Importa a função para conectar ao banco de dados

console.log(process.env.STRING_CONEXAO); // Imprime a string de conexão ao banco de dados no console (para debug)

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão fornecida e armazena a conexão em uma constante

// Array de posts de exemplo (será substituído pelos dados do banco de dados)
const posts = [
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Uma gato fazendo yoga", imagem: "https://placecats.com/150" },
    { id: 3, descricao: "Um gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"}
];

const app = express(); // Cria uma instância do Express para iniciar a aplicação
app.use(express.json()); // Habilita o parser JSON para lidar com requisições com corpo em formato JSON

// Inicia o servidor na porta 3000 e imprime uma mensagem no console quando o servidor estiver ouvindo
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Função assíncrona para obter todos os posts do banco de dados
async function getTodosPosts() {
    // Obtém o banco de dados 'instabytes' da conexão
    const db = conexao.db("instabytes")
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts")
    // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array
    return colecao.find().toArray()
}

// Rota GET para obter todos os posts
app.get("/posts", async(req, res) => {
    // Chama a função para obter todos os posts
    const posts = await getTodosPosts()
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
});

// function buscarPostPorID(id) {
//    return posts.findIndex((post) => {
//        return post.id === Number(id)
//    })
//}
//app.get("/posts/:id", (req, res) => {
 //   const index = buscarPostPorID(req.params.id)
//    res.status(200).json(posts[index]);
//});