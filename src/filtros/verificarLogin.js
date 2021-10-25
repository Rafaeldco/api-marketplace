const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Acesso não permitido, o token não foi informado." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, secret);

        const { rows, rowCount } = await conexao.query('select * from usuarios where id = $1', [id]);

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Usuário não encontrado." });
        }

        const { senha, ...usuario } = rows[0];

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }
}

module.exports = verificarLogin;
