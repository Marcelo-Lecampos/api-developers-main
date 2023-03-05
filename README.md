# Api-developers 🚀

Este projeto foi desenvolvido durante o programa devinHouse no módulo de testes no backend. Nosso desafio foi criar testes utilizando o jest para os services de Developers e fazer a documentação utilizando o Swagger do Developers.

Link para o projeto front-end:

- [Deploy 🌐](https://api-developers-main.onrender.com)
- [Swagger online 📖](https://api-developers-main.onrender.com/api-docs)

Obs: Por estarem hospedados na tier gratuito do render, pode demorar alguns minutos no primeiro acesso . ⏳

## Tabela de Conteúdos

- [🛠️ Tecnologias](##Tecnologias)
- [🛒 Pré-requisitos](##Pré-requisitos)
- [🚀 Configurando para uso](##Rodando_localmente)
- [💡 Aprendizados](##Aprendizados)
- [📝 Mensagem Final](##Mensagem_Final)
- [🔒 Licença](##Licensas)

## Tecnologias 💻

    - Node; 🟩
    - Nest.js; 🟪
    - Typeorm; 🗄️
    - Jest 🧪
    - Swagger 📖

## Rodando Localmente 🚀

### Clone o projeto 📂

```bash
  git clone https://link-para-o-projeto
```

### Configurações para uso 🛠️

Duas formas foram configuradas para uso no Projeto, escolha a que for mais conveniente para você:

#### 1) Utilizando Docker 🐳

```bash
1) Utilizar o comando `docker-compose up` para subir o container;
2) Abra um novo terminal e utilize o comando `docker exec -it nest bash` para acessar o terminal do container;
3) Agora pode utilizar os comandos que estão no [Realizando os testes 🧪](#Realizando-os-testes)
```

#### 2) Manual 📝

Pré-requisitos:

```bash
- Ter o `node` instalado na máquina 📥
- Ter o `postgres` instalado na máquina 🐘
```

```bash
1) Criar o database no Postgres, para utilizar no projeto;
2) Utilizar o comando `npm install` para instalar as dependências;
3) Utilizar o `.env_example` como base para o `.env` e colocar as suas configurações;
4) Utilizar o comando `npm run migration:run` para criar as tabelas após a configuração das variáveis de ambiente no passo 3
5) Utilizar o comando `npm run start:dev` para executar a aplicação no ambiente de desenvolvimento.
```

### Realizando os testes 🧪

```bash
# Testes Globais:
$ npm run test

# Testes Especificos:

$ npm run test:dev
^ realiza testes no developer service

$ npm run test:tech
^ realiza testes no technology service


```

## Aprendizados 💡

- Aprender a documentar usando swagger foi a parte mais legal deste projeto, testes pude ter um gostinho mas ainda tenho muito o que aprender.

## Mensagem Final 💭

- Quero agradecer o professor Pedro por compartilhar um pouco do seu conhecimento 🙏
- Agradecer ao projeto devinhouse e aos meus colegas 👥

## Licença 📄

[MIT](https://choosealicense.com/licenses/mit/) 📜
