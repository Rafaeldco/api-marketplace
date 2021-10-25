const conexao = require('../conexao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;
    const { categoria } = req.query;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    try {
        if (categoria) {
            const { rows } = await conexao.query('select * from produtos where usuario_id = $1 and categoria = $2', [usuario.id, categoria]);
            return res.status(200).json(rows);
        }
        const { rows } = await conexao.query('select * from produtos where usuario_id = $1', [usuario.id]);
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const detalharProduto = async (req, res) => {
    const { usuario } = req;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    const { id } = req.params;

    const { rowCount, rows } = await conexao.query('select * from produtos where id = $1 and usuario_id = $2', [id, usuario.id]);

    if (rowCount === 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    res.status(200).json(rows[0]);
}

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

    if (!nome || !preco || !descricao) {
        return res.status(400).json({ mensagem: "Os campos a seguir são obrigatórios: nome, quantidade, preço e descricao." });
    }
    if (!quantidade || quantidade <= 0) {
        return res.status(400).json({ mensagem: "A quantidade deve ser maior que 0." });
    }

    try {
        const { rowCount } = await conexao.query('insert into produtos (nome, quantidade, categoria, preco, descricao, imagem, usuario_id) values ($1, $2, $3, $4, $5, $6, $7)', [nome, quantidade, categoria, preco, descricao, imagem, usuario.id]);

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o produto." });
        }
        res.status(201).json();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    const { rowCount } = await conexao.query('select * from produtos where id = $1 and usuario_id = $2', [id, usuario.id]);

    if (rowCount === 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }


    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

    if (!nome || !preco || !descricao || !categoria || !imagem) {
        return res.status(400).json({ mensagem: "Todos os campos (nome, quantidade, categoria, preco, descricao e imagem) são obrigatórios!" });
    }

    if (!quantidade || quantidade <= 0) {
        return res.status(400).json({ mensagem: "A quantidade deve ser maior que 0." });
    }

    try {
        const { rowCount } = await conexao.query('update produtos set nome = $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6 where id = $7 and usuario_id = $8', [nome, quantidade, categoria, preco, descricao, imagem, id, usuario.id]);

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível atualizar o produto." });
        }
        res.status(201).json();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    if (!usuario) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    const { rowCount } = await conexao.query('select * from produtos where id = $1 and usuario_id = $2', [id, usuario.id]);

    if (rowCount === 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    try {
        const { rowCount } = await conexao.query('delete from produtos where id = $1', [id]);
        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível excluir o produto." });
        }
        return res.status(200).json();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    detalharProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}