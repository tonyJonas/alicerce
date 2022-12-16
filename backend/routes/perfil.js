const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal para acessar a pagina de perfil
router.all("/", (req, res) => {

	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	let id_oportunidade = req.query.id_oportunidade
	let sql
    if (Object.keys(req.query).length > 0) { 
        sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco;`; 
	} 

	// db.get(sql, [id_oportunidade], (err, row) => {
	// 	if (err) {
	// 		console.error(err.message);
	// 		res.send("Erro: " + err.message);
	// 		return;
	// 	}
		
	// });

	res.render("perfil/index");
});
	

// rota para obter informaçoes do usuario na pagina de perfil
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

// rota para alterar dados da pagina de perfil
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

// rota para remover usuario da pagina de perfil
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


module.exports = router;
