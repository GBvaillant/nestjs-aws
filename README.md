<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
 <h1>🐱 HTTP Cats API</h1>

Uma API RESTful feita com **NestJS** que permite cadastrar e listar imagens de gatos representando códigos de status HTTP (ex: 401, 404, 500 etc).

As imagens são armazenadas em um **bucket S3 simulado com LocalStack**, e os metadados (nome e URL) são salvos em um banco de dados **MongoDB** containerizado com Docker.

---

## 🚀 Tecnologias Utilizadas

* [NestJS](https://nestjs.com/) — Framework Node.js para aplicações escaláveis
* [MongoDB](https://www.mongodb.com/) — Banco de dados NoSQL
* [Docker](https://www.docker.com/) — Contêineres para MongoDB e LocalStack
* [AWS S3 (via LocalStack)](https://docs.localstack.cloud/) — Armazenamento de arquivos local simulando a AWS
* [Mongoose](https://mongoosejs.com/) — ODM para MongoDB

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/GBvaillant/http-cats-api.git
cd http-cats-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Suba o container (MongoDB)

```bash
docker-compose up -d
```

### 4. Crie o bucket no LocalStack

```bash
aws --endpoint-url=http://localhost:4566 s3 mb s3://http-cats
```

> ⚠️ Certifique-se de que o AWS CLI está configurado com as credenciais:
>
> ```
> aws configure
> AWS Access Key ID: test
> AWS Secret Access Key: test
> Region: us-east-1
> ```

### 5. Rode o backend

```bash
npm run start:dev
```

---

## 📤 Endpoints

### `POST /cats`

> Faz upload de uma imagem e salva os dados no MongoDB.

**Requisição:** `multipart/form-data`

| Campo | Tipo | Descrição                      |
| ----- | ---- | ------------------------------ |
| name  | Text | Nome (ex: `401`)        |
| file  | File | Imagem do gato (ex: `401.jpg`) |

**Resposta:**

```json
{
  "_id": "687fa57e724101ef7618184a",
  "name": "401",
  "url": "http://localhost:4566/http-cats/1753195902538-401.jpg",
  "createdAt": "2025-07-22T14:51:42.550Z",
  "updatedAt": "2025-07-22T14:51:42.550Z"
}
```

---

### `GET /cats`

> Lista todos os gatos cadastrados

**Resposta:**

```json
[
  {
    "_id": "687fa57e724101ef7618184a",
    "name": "401",
    "url": "http://localhost:4566/http-cats/1753195902538-401.jpg"
  }
]
```

---

## 🥪 Testando com cURL

```bash
curl -X POST http://localhost:3000/cats \
  -H "Content-Type: multipart/form-data" \
  -F "name=401" \
  -F "file=@./401.jpg"
```
---

## 📄 Licença

Projeto livre para fins de estudo. Desenvolvido por [Gabriel Vaillant](https://www.linkedin.com/in/gb-vaillant/).
