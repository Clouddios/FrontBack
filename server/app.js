let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose'); 
let methodOverride = require('method-override');

//obj
let app = express();

app.use(cors());

//permite usar o verbo HTTP
app.use(methodOverride('X-HTTP-Method'))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('X-Method-Override'))
app.use(methodOverride('_method'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//pasta raiz
app.get('/', (req, res) => {
    res.send({ status: 'ok' });
});

//mongoose
//conecta ao banco de dados
let url = 'mongodb://admin:admin@localhost:27018/FrontBack?authSource=admin'; //url do banco de dados
mongoose.connect(url).then(() => {
    console.log('Banco de dados conectado com sucesso!');
}).catch((err) => {
    console.log('Erro ao conectar no banco de dados: ' + err);
});

//criar uma estrutura de dados
let User = mongoose.model('Usuario', new mongoose.Schema({
    nome: String,
}));

//rota para adicionar usuário
app.post('/add', async (req, res) => {
    try {
        const { nome } = req.body; // Captura o nome do corpo da requisição
        const item = new User({ nome }); // Cria um novo objeto do tipo User
        await item.save(); // Salva no banco de dados
        res.status(201).send({ message: 'Usuário adicionado com sucesso!', user: item }); // Responde ao cliente
    } catch (err) {
        res.status(500).send({ message: 'Erro ao adicionar usuário', error: err.message }); // Responde com erro
    }
});

//rota para atualizar usuário
app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params; // Captura o ID do usuário da URL
        const { nome } = req.body; // Captura o novo nome do corpo da requisição

        const u = await User.findByIdAndUpdate(id, { nome }, { new: true }); // Atualiza o usuário no banco de dados
        
        if (u) {
            res.status(200).send({ message: 'Usuário atualizado com sucesso!', user: u }); // Responde com sucesso
        } else {
            res.status(404).send({ message: 'Usuário não encontrado!' }); // Responde com erro se o usuário não for encontrado
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao atualizar usuário', error: err.message }); // Responde com erro
    }
});

//rota para listar usuários
app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find(); // Busca todos os usuários no banco de dados

        // Formata os usuários para que o _id seja uma string simples
        const formattedUsers = users.map(user => ({
            _id: user._id.toString(), // Converte o ObjectId para string
            nome: user.nome,
            __v: user.__v
        }));

        res.status(200).send(formattedUsers); // Retorna os usuários formatados
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar usuários', error: err.message }); // Responde com erro
    }
});

//rota para excluir usuário
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params; // Captura o ID do usuário da URL

        const deletedUser = await User.findByIdAndDelete(id); // Exclui o usuário no banco de dados

        if (deletedUser) {
            res.status(200).send({ message: 'Usuário excluído com sucesso!', user: deletedUser }); // Responde com sucesso
        } else {
            res.status(404).send({ message: 'Usuário não encontrado!' }); // Responde com erro se o usuário não for encontrado
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao excluir usuário', error: err.message }); // Responde com erro
    }
});

//cria o servidor
let server = app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

const Exibir = async () => {
  try {
    const response = await fetch("http://localhost:3000/getUsers");
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    setUsers(data); // Armazena os usuários no estado
  } catch (error) {
    console.error("Erro ao exibir usuários:", error);
  }
};

const Atualizar0 = async () => {
  try {
    const response = await fetch(`http://localhost:3000/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        nome: name, // Atualiza o nome capturado dinamicamente
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};

const Excluir = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Atualiza a lista de usuários após a exclusão
    setUsers(users.filter(user => user._id !== id));
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
};

<View>
  {users.map(user => (
    <View key={user._id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
      <Text>{`ID: ${user._id}, Nome: ${user.nome}`}</Text>
      <TouchableOpacity
        onPress={() => Excluir(user._id)}
        style={{ backgroundColor: "red", padding: 5, marginLeft: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  ))}
</View>