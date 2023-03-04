basic mysql crud application.



npm packages used---->
    express
    mysql2
    redis
    nodemon -D


queries---->
    db.query("SELECT * FROM table_name",callback fn)

    db.query("INSERT INTO table_name (name,email,password) VALUES (?,?,?)",[name,email,password],callback fn)

    db.query('UPDATE table_name SET ? WHERE id = ?', [req.body,req.params.id ],callback fn)

    db.query("DELETE FROM table_name WHERE id=?" [userId],callback fn)