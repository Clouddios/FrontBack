require("dotenv").config({ path: "./.env" });
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware de permissões para o frontend acessar a API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

// Middleware para ler dados do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para permitir sobrescrita de métodos (caso necessário)
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

// Conexão com o MongoDB
let url = process.env.DB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("🟢 Conectado ao MongoDb");
  })
  .catch((e) => {
    console.log("🔴 Erro ao conectar ao MongoDb:", e);
  });

// Schema para pedidos
let Pedido = new mongoose.Schema({
  cliente: { type: String, required: true },
  produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
});

// Model
const PedidoModel = mongoose.model("Pedido", Pedido);

// ROTAS

// GET - Listar todos os pedidos
app.get("/", async (req, res) => {
  const pedidos = await PedidoModel.find({});
  res.json(pedidos);
});

// DELETE - Apagar todos os pedidos
app.delete("/delete/delete-all", async (req, res) => {
  try {
    await PedidoModel.deleteMany({});
    res.send({ status: "todos os pedidos foram deletados" });
  } catch (error) {
    res.status(500).send({ erro: "erro ao deletar todos os pedidos" });
  }
});

// DELETE - Apagar um pedido por ID
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await PedidoModel.findByIdAndDelete(id);
    if (resultado) {
      res.send({ status: "pedido deletado" });
    } else {
      res.status(404).send({ erro: "pedido não encontrado" });
    }
  } catch (error) {
    res.status(500).send({ erro: "erro ao deletar o pedido" });
  }
});

// POST - Criar novo pedido
app.post("/add", async (req, res) => {
  const { cliente, produto, quantidade } = req.body;
  try {
    const novoPedido = new PedidoModel({ cliente, produto, quantidade });
    await novoPedido.save();
    res.send({ status: "pedido adicionado", data: novoPedido });
  } catch (error) {
    res.status(500).send({ erro: "erro ao adicionar pedido" });
  }
});

// PATCH - Atualizar campos específicos de um pedido
app.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const atualizacoes = req.body;
  try {
    const atualizado = await PedidoModel.updateOne({ _id: id }, atualizacoes);
    if (atualizado.modifiedCount > 0) {
      res.send({ status: "pedido alterado" });
    } else {
      res.send({ erro: "nenhuma alteração realizada" });
    }
  } catch (error) {
    res.status(500).send({ erro: "erro ao atualizar pedido" });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
