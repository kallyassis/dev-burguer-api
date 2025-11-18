module.exports =  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST, //127.0.0.1
    port:process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABAS,
    define:{
        timestamps: true, //cria horario em que o registro foi criado.
        underscored: true, 
        underscoredAll: true //snake case
    }
}
