FrontBack - CRUD de Pedidos

Este projeto é uma aplicação full-stack que implementa um CRUD (Create, Read, Update, Delete) de pedidos. Ele utiliza Node.js com Express e MongoDB no backend, e React Native com Expo no frontend.

---

📋 Funcionalidades

- Adicionar Pedido: Insere um novo pedido com os campos Cliente, Produto e Quantidade.
- Listar Pedidos: Exibe todos os pedidos cadastrados.
- Atualizar Pedido: Permite editar os campos de um pedido existente.
- Excluir Pedido: Remove um pedido específico ou todos os pedidos.

---

🛠️ Tecnologias Utilizadas

Backend
- Node.js
- Express
- MongoDB
- Mongoose

Frontend
- React Native
- Expo
- React Native Paper

---

🚀 Como Executar o Projeto

Pré-requisitos
- Node.js instalado (https://nodejs.org/)
- MongoDB instalado ou rodando em um contêiner Docker
- Expo CLI instalado globalmente:
  npm install -g expo-cli

---

1. Configurar o Backend

1. Navegue até o diretório do backend:
   cd server

2. Instale as dependências:
   npm install

3. Configure o arquivo .env:
   Crie um arquivo .env no diretório server com o seguinte conteúdo:
   DB_URL=mongodb://admin:admin@localhost:27017/lojadb?authSource=admin
   PORT=3000

4. Certifique-se de que o MongoDB está rodando. Se estiver usando Docker:
   docker run -d -p 27017:27017 --name mongodb mongo

5. Inicie o servidor:
   npm start

6. Verifique no terminal se o servidor está rodando:
   🟢 Conectado ao MongoDb
   🚀 Servidor rodando em http://localhost:3000

---

2. Configurar o Frontend

1. Navegue até o diretório do frontend:
   cd front

2. Instale as dependências:
   npm install

3. Inicie o projeto Expo:
   npm start

4. No terminal, você verá um QR Code. Escaneie-o com o aplicativo Expo Go no seu dispositivo móvel ou abra no simulador.

---

📂 Estrutura do Projeto

Backend (server)
- app.js: Configuração do servidor e rotas do CRUD.
- .env: Configuração da URL de conexão com o MongoDB.

Frontend (front)
- App.js: Componente principal que gerencia o fluxo do aplicativo.
- components/Insert.js: Componente para adicionar novos pedidos.
- components/Exibe.js: Componente para listar, atualizar e excluir pedidos.

---

🔧 Rotas da API

Base URL: http://localhost:3000

- GET /: Lista todos os pedidos.
- POST /add: Adiciona um novo pedido.
  Body:
    {
      "cliente": "João",
      "produto": "Hambúrguer",
      "quantidade": 2
    }
- PATCH /update/:id: Atualiza um pedido pelo ID.
  Body:
    {
      "cliente": "Maria",
      "produto": "Pizza",
      "quantidade": 3
    }
- DELETE /delete/:id: Exclui um pedido pelo ID.
- DELETE /delete/delete-all: Exclui todos os pedidos.

---

🖥️ Telas do Frontend

1. Adicionar Pedido:
   - Formulário para inserir Cliente, Produto e Quantidade.
   - Botão para cadastrar o pedido.

2. Listar Pedidos:
   - Exibe os pedidos cadastrados em cartões.
   - Botões para atualizar ou excluir cada pedido.

3. Atualizar Pedido:
   - Modal para editar os campos de um pedido.

4. Excluir Todos:
   - Botão para excluir todos os pedidos cadastrados.

---

🛠️ Possíveis Problemas e Soluções

1. Erro de Autenticação no MongoDB
   - Certifique-se de que o usuário admin foi criado no banco de dados admin:
     use admin
     db.createUser({
       user: "admin",
       pwd: "admin",
       roles: [{ role: "root", db: "admin" }]
     })

2. Erro ao Instalar Dependências
   - Certifique-se de que o Node.js está instalado corretamente.
   - Use o comando:
     npm install

3. Expo Go Incompatível
   - Atualize o SDK do projeto com:
     expo upgrade


---

📝 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo.
