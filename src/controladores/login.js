const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Insira o e-mail e a senha." });
    }

    try {
        const consultarEmail = 'select * from usuarios where email = $1';
        const { rows, rowCount } = await conexao.query(consultarEmail, [email]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
        const usuario = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);
        if (!senhaVerificada) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválidos." });
        }

        const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '4h' });
        res.status(200).json({ token });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}