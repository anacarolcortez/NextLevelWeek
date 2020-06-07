const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const db = require("./database/db");

//configurar pasta pública
server.use(express.static("public"));

//configurar o uso do req.body
server.use(express.urlencoded({extended: true}));

//configurar nunjucks: ferramenta que permite incluir lógicas de programação no html
//por exemplo, tornar páginas mais dinâmicas, sunstituindo o conteúdo padrão por info do BD
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//faz requisição
server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {    
    //console.log(req.query);
    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
    //console.log(req.body);

    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `);
    
    const query = `
        INSERT INTO places (
            image, 
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err){
            console.log(err);
            return res.send("Erro no cadastro");
        }
        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData);
    
    
});

server.get("/search-results", (req, res) => {

    const search = req.query.search;

    /*
    if (search == "") {
        return res.render("search-results.html", {total: 0});
    }
    */ //Prefiro que apareçam todos os resultados caso não seja pesquisado nada

    db.all(`SELECT * FROM places WHERE state LIKE '%${search}%'`, function(err, rows){
        if (err){
            return console.log(err)
        }
        const total = rows.length;
        return res.render("search-results.html", {places: rows, total: total});
    })

});

//ligar servidor
server.listen(3000);