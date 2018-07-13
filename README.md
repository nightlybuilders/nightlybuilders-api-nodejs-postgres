# Nightly Builders Node.js API

A base repository which provides an opinionated setup.

## Features

 - [Node.js](https://nodejs.org/) LTS version
 - [Hapi.js](https://hapijs.com/)
 - [Apollo GraphQL Server](apollo-server-hapi)
 - [Sequelize](http://docs.sequelizejs.com/)
 - [PostgreSQL](https://www.postgresql.org/)
 - [Jest](https://jestjs.io/)
 - [Yarn](https://yarnpkg.com/)
 - [NVM](https://github.com/creationix/nvm)


## Setup, Development and Testing

Bootstrap the project by installing all dependencies:

```
nvm use  # we recommend using 'nvm'
yarn  # will install Node.js dependencies
```

Start the local database:

```
cd docker
docker-compose up
```

Start the development server:

```
yarn run devserver
```

Run all tests:

```
yarn test
```

Build a docker image:

```
cd docker
docker-compose build
```


## LICENCE

[Apache License 2.0](LICENCE)


## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/lumannnn">
          <img width="150" height="150" src="https://github.com/lumannnn.png?v=3&s=150">
          </br>
          Lukas Ender
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/natterstefan">
          <img width="150" height="150" src="https://github.com/natterstefan.png?v=3&s=150">
          </br>
          Stefan Natter
        </a>
      </td>
    </tr>
  <tbody>
</table>
