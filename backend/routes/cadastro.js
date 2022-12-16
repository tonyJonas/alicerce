const express = require("express");
const db = require("../utils/db");
const router = express.Router();
const app = express()



app.use(express.json())





app.use(express.urlencoded())
// rota principal de cadastro
router.all("/", (req, res) => {
	res.render("cadastro/cadastro");
});

router.all("/continuacao", (req, res) => {
	res.render("cadastro/continuacao");
});

router.all("/completar", (req, res) => {
	res.render("cadastro/completar");
});

// rota principal para retornar os dados do cadastro

router.get("/alterar", (req, res) => {
	let id = req.query["id"];

	if (!id) {
		res.send("Id faltando");
		return;
	}

	const sql = "SELECT id, nome, email FROM pessoa WHERE id=?";

	console.log(sql);

	db.get(sql, [id], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}
		res.render("funcionarios/form", { funcionario: row });
	});
});

// rota para alterar o cadastro
router.post("/alterar", (req, res) => {
	let msg;
	let id = req.body["id"];
	let nome = req.body["nome"];
	let email = req.body["email"];

	if (!id) {
		res.send("Id faltando");
		return;
	}

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "UPDATE pessoa SET nome=?, email=? WHERE id=?";

	console.log(sql);

	db.run(sql, [nome, email, id], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("funcionarios/alterar", { mensagem: msg });
	});
});

// rota para remover cadastro
router.get("/remover", (req, res) => {
	let msg;
	let id = req.query["id"];

	const sql = "DELETE FROM pessoa WHERE id=?";
	console.log(sql);

	db.all(sql, [id], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Usuário Removido!";

		res.render("funcionarios/remover", { mensagem: msg });
	});
});

// rota para inserir cadastro
router.all("/inserir", (req, res) => {
	const id = req.query["id"];
	const nome = req.query["nome"];
	const email = req.query["email"];

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "INSERT INTO pessoa (nome, email) VALUES (?, ?)";
	console.log(sql);

	db.run(sql, [nome, email], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}

		res.render("funcionarios/inserir", { msg: mensagem });
	});
});

// exportnado objeto router
module.exports = router;


router.get('/cadastro2', (req, res)=>{

	res.sendFile(__dirname + 'src/frontend/views/cadastro/index.ejs')

})

//adicionando dados do cadastro 1
router.post('/cadastro1Post',(req,res)=>{
	
	const cnpj = req.body.cnpj
	const email = req.body.email
	const telefone = req.body.telefone
	const senha = req.body.senha
	console.log(req.body)

	let sql = `INSERT INTO empreiteiras (CNPJ, email , telefone) VALUES ("${cnpj}","${email}","${telefone}")`
	res.redirect("/cadastro/completar")
	console.log(sql)
	//db.run(sql)
})

router.post('/completarCadastro',(req,res)=>{
	const trabalhouComMrv = req.body.trabalhouComMrv
	const razao_social = req.body.razaoSocial
	const nome_fantasia = req.body.nomeFantasia
	const cep = req.body.cep
	const rua = req.body.rua
	const numero = req.body.numero
	console.log(req.body)
	res.redirect("/cadastro/continuacao")

})


router.post("/continuacaoCadastro",(req,res)=>{
	const cpf = req.body.cpf
	const nome = req.body.nome
	const genero = req.body.genero
	const departamento = req.body.departamento
	const funcao = req.body.funcao
	
	console.log(req.body)
	res.send("Cadastrado!")
	
	
	res.redirect("/")
	
})


router.get("/obra",(req,res)=>{
	res.render("cadastro/obra")
  })

router.post("/inserirObra",(req,res)=>{
    
	
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    const resumo = req.body.resumo
    const data_inicio = req.body.data_inicio
	const especialidade = req.body.especialidade
	const nome_oportunidade = req.body.nome_oportunidade
	const endereco = req.body.endereco	
	const qtde = req.body.quantidade_pessoas_desejadas
	const id_obra = req.body.obra



	let sql = `INSERT INTO oportunidades (id_especialidade, nome_oportunidade,id_endereco,image,titulo, descricao, resumo, data_inicio,quantidade_pessoas_desejadas,id_obra) values("${especialidade}","${nome_oportunidade}","${endereco}","imagem_teste","${titulo}","${descricao}","${resumo}","${data_inicio}","${qtde}","${id_obra}")`
    console.log(sql)
	db.run(sql)
	
})