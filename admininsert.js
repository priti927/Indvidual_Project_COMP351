const http = require("http");
const url = require("url");
const mysql = require("mysql");


http.createServer(function(req, res){
    let q = url.parse(req.url,true);

    console.log(q.query);
    queId = q.query["questionID1"];
    que_d = q.query["questionText1"];
    code_d =q.query["code1"];
    optionA = q.query["optionsList1"];
    optionB = q.query["optionsList2"];
    optionC = q.query["optionsList3"];
    optionD = q.query["optionsList4"];
    correctAnswer = q.query["correctAnswer"];
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
            let sql2, sql3, sql4;
          let sql1 = "INSERT INTO questions(que_id, que, code, answer) values ('"+ queId +"', '"+ que_d +"','"+ code_d +"','"+ correctAnswer +"')";


          console.log(sql1);
          // console.log(saveId);
            
            con.query(sql1, function(err, result){
                if(err) throw err;
                console.log("1 record inserted");  
                //res.end(" stored in DB");              
            });
         //let saveId = "slelect que_id from questions order by que_id desc limit 1" ;


          if((optionC=="" ) && (optionD=="")){
             sql2 = "INSERT INTO options(que_id, choice, choice_value) values('"+ queId +"',  '"+ optionA +"' , 'a' ),('"+ queId +"',  '"+ optionB +"', ' b ')";
             console.log(sql2);
             con.query(sql2, function(err, result){
                if(err) throw err;
                console.log("1 record inserted");  
                res.end(" stored in DB");              
            });

          }
          else if (optionD=="")
          {
             sql3 = "INSERT INTO options(que_id, choice, choice_value) values('"+ queId +"',  '"+ optionA +"', 'a'),('"+ queId +"',  '"+ optionB +"', 'b'),('"+ queId +"',  '"+ optionC +"', 'c')";
             console.log(sql3);

             con.query(sql3, function(err, result){
                if(err) throw err;
                console.log("1 record inserted");  
                res.end(" stored in DB");              
            });
          }
          else{
           sql4 = "INSERT INTO options(que_id, choice, choice_value) values('"+ queId +"',  '"+ optionA +"', 'a'),('"+ queId +"',  '"+ optionB +"' , 'b'),('"+ queId +"',  '"+ optionC +"', 'c' ),('"+ queId +"',  '"+ optionD +"', 'd')"; 
          
           console.log(sql4);
            
            
           con.query(sql4, function(err, result){
               if(err) throw err;
               console.log("1 record inserted");  
               res.end(" stored in DB");              
           });  
        }
            
           

            
          
        });
        

}).listen(8811);
