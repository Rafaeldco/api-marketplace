DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome varchar(200) NOT NULL,
  nome_loja varchar(200) NOT NULL,
  email varchar(200) NOT NULL UNIQUE,
  senha text NOT NULL
);

DROP TABLE IF EXISTS produtos CASCADE;

CREATE TABLE produtos (
  id serial PRIMARY KEY,
  usuario_id int REFERENCES usuarios(id),
  nome varchar(200) NOT NULL,
  quantidade int NOT NULL,
  categoria varchar(200),
  preco int NOT NULL,
  descricao text NOT NULL,
  imagem text
);
