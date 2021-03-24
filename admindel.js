const http = require("http");
const url = require("url");
const mysql = require("mysql");


http.createServer(function(req, res){
    let q = url.parse(req.url,true);

    console.log(q.query);
    queId = q.query["questionID1"];
    
    console.log("Request recieved");
    res.writeHead(200, {"Content-Type": "text/html",
     "Access-Control-Allow-Origin": "*"});
           
    
     const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "priti",
        port: 3325,
        }
    );
    
            con.connect(function(err){
            if(err) throw err;
            console.log("Connected!");
            
          let sql1 = "Delete from questions where que_id="+ queId;
         let sql2 = "Delete from options where que_id=" + queId;

        
            console.log(sql1);
            console.log(sql2);
            con.query(sql1, function(err, result){
                if(err) throw err;
                console.log("1 record deleted");  
                              
            });

           con.query(sql2, function(err, result){
                if(err) throw err;
                console.log("1 record deleted");  
                res.end(" deleted in DB");              
            });
            

             });
        

}).listen(8822);
