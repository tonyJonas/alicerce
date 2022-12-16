const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal para acessar a pagina de login
router.all("/", (req, res) => {
	res.render("login/index");
});

// rota para logar
router.all("/logar", (req, res) => {
	let pessoas;
	let ordenar = req.query["ordenar"];
	let params;

	if (!ordenar) {
		ordenar = "";
		params = [];
	} else {
		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
		params = [ordenar];
	}

	const sql = "SELECT id, nome, email FROM pessoa " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("funcionarios/listar", { model: rows });
	});
});

// exportando o objeto router
module.exports = router;
