const http = require("http");
const mysql = require("mysql");
let que1=[]; 
let result1=[];
let optionarr=[];

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "priti",
    port: 3325,
});

const connection =con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
    let sql = "select questions.que_id, questions.que, questions.code, GROUP_CONCAT(options.choice_value,')' , options.choice SEPARATOR '<br>') as hello from questions left join options on questions.que_id = options.que_id group by questions.que_id;";
   
   //let sql2 = "SELECT que_id, GROUP_CONCAT(choice , ' ') FROM options GROUP BY que_id";
   
    //let sql = "select questions.que_id, questions.que, questions.code, options.choice from questions inner join options on questions.que_id = options.que_id ";
    //let sql = "select questions.que_id, questions.que, questions.code, options.GROUP_CONCAT(choice , ' ') from questions inner join options on questions.que_id = options.que_id ";
    
    console.log(sql);
   // console.log(sql2);
    con.query(sql,function(err, result){
        if(err) throw err;
        console.log(result);
    que1=result;    
    });

    
});
const server=http.createServer(function(req, res){
         
    console.log("Request recieved");
    res.writeHead(200, {"Content-Type": "text/html",
     "Access-Control-Allow-Origin": "*"});    
    
    console.log(que1.length);
    
    for(let i=0; i<que1.length;i++){
        
       // result1[i]= "Question ID"+que1[i].que_id +":"+que1[i].que+ "<br>"+que1[i].code+"<br>";
            result1[i]= "Question ID"+que1[i].que_id +" "+que1[i].que+ "<br>"+que1[i].code+"<br>"+que1[i].hello+"<br>"+"<br><input type=\"text\" id=\"txt"+i+"\"><br><br>";
            
            optionarr=que1[i].hello;
            //console.log(optionarr);
            
        
        }
        let final_result="";
        for(let i=0; i<que1.length;i++){
            final_result += result1[i]+"<br>";
            }
    console.log(final_result);
        res.end(final_result); 

       
}).listen(8866);



