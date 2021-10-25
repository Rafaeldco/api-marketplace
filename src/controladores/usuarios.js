const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome || !email || !senha || !nome_loja) {
        return res.status(400).json({ mensagem: "Todos os campos (nome, email, senha e nome_loja) são obrigatórios!" });
    }

    try {
        const consultarEmail = 'select * from usuarios where email = $1';
        const { rowCount: qtdUsuarios } = await conexao.query(consultarEmail, [email]);

        if (qtdUsuarios > 0) {
            return res.status(400).json({ mensagem: "Já existe um usuário cadastrado com esse e-mail." });
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const { rowCount } = await conexao.query('insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)', [nome, email, senhaCriptografada, nome_loja]);

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuário." });
        }
        return res.status(201).json();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const detalharUsuario = async (req, res) => {
    const { usuario } = req;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }
    res.status(200).json(usuario);
}

const editarUsuario = async (req, res) => {
    const { usuario } = req;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    const { nome, email, senha, nome_loja } = req.body;

    if (!nome || !email || !senha || !nome_loja) {
        return res.status(400).json({ mensagem: "Todos os campos (nome, email, senha e nome_loja) são obrigatórios!" });
    }

    try {
        const consultarEmail = 'select * from usuarios where email = $1';
        const { rowCount: qtdUsuarios } = await conexao.query(consultarEmail, [email]);

        if (qtdUsuarios > 0 && email !== usuario.email) {
            return res.status(400).json({ mensagem: "Já existe um usuário cadastrado com esse e-mail." });
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioAtualizado = await conexao.query('update usuarios set nome = $1, email = $2, senha = $3, nome_loja = $4 where id = $5', [nome, email, senhaCriptografada, nome_loja, usuario.id]);

        if (usuarioAtualizado.rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível atualizar o usuário." });
        }
        return res.status(200).json();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    editarUsuario
}