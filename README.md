<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://s3.amazonaws.com/gupy5/production/companies/793/career/1049/images/2020-04-30_17-12_logo.png" alt="Project logo"></a>
</p>

<h3 align="center">Desafio IClinic</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SDEverton/iclinic_test/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SDEverton/iclinic_test/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Descrição do projeto
    <br> 
</p>

## 📝 Índice

- [Sobre](#about)
- [Instalação](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 Sobre <a name = "about"></a>

O desafio consiste em criar uma API que contemple as boas práticas (TDD, SOLID, 12Factor) da programação utilizando Node JS.

## 🏁 Iniciando <a name = "getting_started"></a>

Seguindo um princípo destacado no desafio no qual a aplicação deve funcionar em qualquer ambiente foi criado um conteiner utilizando Docker.


### Pré-requisitos

- [NodeJS](https://nodejs.org/en/) - Server Environment
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Principais técnologias envolvidas (libs e outros)

Axios
Cors
Dotenv
Express
Postgres
Redis
Supertest
Jest
Swagger
Typeorm

Para criar a aplicação foi utilizado o famoso Express de nos da maior flexibilidade para aplicar o SOLID em conjunto com outras metodologias.
Como foi necessário consumir serviços externos o Axios é mais malevavel e adaptavel para esse tipo de cenário, também foi solicitado que houvesse persistência dos dados em um banco, logo utilizei o Typeorm para criar esse vinculo com o Postgres (poderia ser outro banco até mesmo o Mongo NoSql). Visando a estrategia de Cache foi usado o Redis para executar essa tarefa respeitando sempre as regras impostas. Para testes utilizei o Jest com Supertest assumindo que essa lib pode ser usada tanto no Back-end como no Front-end.
Não foi solicitado uma documentação da aplicação, mas inserir o Swagger para que fique mais facíl visializar a aplicação funcioando.
### Startando aplicação

Para iniciar a aplicação com o Docker basta seguir o comando abaixo

```
docker-compose up
```

Com o container no ar basta digitar a url no navegador

```
http://localhost:3333/api-docs
```

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
