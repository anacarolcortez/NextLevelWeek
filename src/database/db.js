const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//Teste de banco de dados:
/*
db.serialize(() => {

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
    `)
    
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
        "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=861&q=80",
        "Green Bottle",
        "Alegre Montoro, Baldeador",
        "n 25",
        "Rio de Janeiro",
        "Niterói",
        "Plástico e Papéis"
    ]

    function afterInsertData(err) {
        if (err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
    }

    db.run(query, values, afterInsertData)

    db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
        if (err){
            return console.log(err)
        }
        console.log("Registro excluído com sucesso");
    })

    db.all(`SELECT * FROM places`, function(err, rows){
        if (err){
            return console.log(err)
        }
        console.log(rows);
    })

});
*/
