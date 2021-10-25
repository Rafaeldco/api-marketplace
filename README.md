# Desafio Módulo 3 - Back-end

RESTful API de um Marketplace que permite:

-   Fazer Login
-   Cadastrar Usuário
-   Detalhar Usuário
-   Editar Usuário
-   Listar produtos
-   Detalhar produtos
-   Cadastrar produtos
-   Editar produtos
-   Remover produtos
-   Filtrar produtos por categoria

Persistência no Banco de Dados PostgreSQL, CRUD, uso de criptografia para senhas com a biblioteca bcrypt e criação de token para login com o jsonwebtoken.

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

### **Login do usuário**

#### `POST` `/login`

### **Detalhar usuário**

#### `GET` `/usuario`

### **Atualizar usuário**

#### `PUT` `/usuario`

### **Listar produtos do usuário logado**

#### `GET` `/produtos`

### **Detalhar um produto do usuário logado**

#### `GET` `/produtos/:id`

### **Cadastrar produto para o usuário logado**

#### `POST` `/produtos`


### **Atualizar produto do usuário logado**

#### `PUT` `/produtos/:id`


### **Excluir produto do usuário logado**

#### `DELETE` `/produtos/:id`

###### tags: `back-end` `nodeJS` `PostgreSQL` `API REST`
