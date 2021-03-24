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
    let sql1, sql2, sql3;
    let sql4, sql5, sql6, sql7;
            con.connect(function(err){
            if(err) throw err;
            console.log("Connected!");
            
          /*if(que_d == "")
          {
            sql1 = "update questions set code ='"+ code_d + "', answer = '"+ correctAnswer+ "' where que_id = '"+ queId + "' ";
          }
          else if(code_d == "")
          {
           // sql2 = "update questions set que = '"+ que_d +"', answer = '"+ correctAnswer+ "' where que_id = '"+ queId + "' "; 
           sql2 = "update questions set que ='"+ que_d + "', answer = '"+ correctAnswer+ "' where que_id = '"+ queId + "' ";
          }
          else{
            sql3 = "update questions set que = '"+ que_d +"', code ='"+ code_d + "', answer = '"+ correctAnswer+ "' where que_id = '"+ queId + "' ";
          }
*/

          if(que_d=="" && correctAnswer=="" && optionA==""&&optionB=="" && optionC=="" && optionD==""){
            sql1 = "update questions set code ='"+ code_d + "' where que_id = '"+ queId + "' ";
            console.log(sql1);
            con.query(sql1, function(err, result){
                if(err) throw err;
                console.log("1 record updated");  
               res.end(" updated in DB"); 

            });

         }


         else if (code_d=="" && correctAnswer == "" &&optionA==""&&optionB=="" && optionC=="" && optionD=="")
         {
            sql2 = "update questions set que ='"+ que_d + "' where que_id = '"+ queId + "' ";
            console.log(sql2); 
            con.query(sql2, function(err, result){
                if(err) throw err;
                console.log("1 record updated");  
               res.end(" updated in DB");              
            });
        }
         

         else if(optionB=="" && correctAnswer == "" && optionC=="" && optionD=="" && que_d=="" && code_d=="") {
          sql4="update options set choice = ' "+ optionA+"' where que_id = '"+queId+"' and choice_value = 'a'";
          console.log(sql4);
            con.query(sql4, function(err, result){
                if(err) throw err;
                console.log("1 record updated");  
                res.end(" updated in DB");  
            });
        }
        else if(optionA=="" && correctAnswer == "" && optionC=="" && optionD==""&& que_d=="" && code_d==""){
         sql5="update options set choice = ' "+ optionB+"' where que_id = '"+queId+"' and choice_value = 'b'";
         console.log(sql5);
            con.query(sql5, function(err, result){
                if(err) throw err;
                console.log("1 record updated");  
                res.end(" updated in DB");  
            });
        }
        else if(optionA=="" && correctAnswer == "" && optionB=="" && optionD==""&& que_d=="" && code_d==""){
         sql6="update options set choice = ' "+ optionC+"' where que_id = '"+queId+"' and choice_value = 'c'";
         console.log(sql6);
            con.query(sql6, function(err, result){
                if(err) throw err;
                console.log("1 record updated");  
                res.end(" updated in DB");  
            });
        }
        else if (optionA=="" && correctAnswer == "" && optionB=="" && optionC==""&& que_d=="" && code_d==""){
         sql7="update options set choice = ' "+ optionD+"' where que_id = '"+queId+"' and choice_value = 'd'";
         console.log(sql7);
            con.query(sql7, function(err, result){
                if(err) throw err;
                console.log("1 record updated");  
                res.end(" updated in DB");  
            });
        }
         
        else if (que_d=="" && code_d=="" && optionA==""&&optionB=="" && optionC=="" && optionD==""){
          sql3 = "update questions set answer = '"+ correctAnswer+ "' where que_id = '"+ queId + "' ";
          console.log(sql3);
          con.query(sql3, function(err, result){
              if(err) throw err;
              console.log("1 record updated");  
              res.end(" updated in DB");              
          }); 
      }
       
        });
         

}).listen(8844);
