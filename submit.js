const http = require("http");
const mysql = require("mysql");
let ans=[]; 
let ansArray=[];
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "priti",
    port:3325,
});

const connection =con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
    let sql = "select questions.que_id, questions.que, questions.answer, GROUP_CONCAT(options.choice, '') as opt from questions left join options on questions.que_id = options.que_id group by questions.que_id";
    console.log(sql);
    con.query(sql,function(err, result){
        if(err) throw err;
        console.log(result);
        ans=result;
    });
});
const server=http.createServer(function(req, res){
         
    console.log("Request recieved");
    res.writeHead(200, {"Content-Type": "text/html",
     "Access-Control-Allow-Origin": "*"});    
    
    console.log(ans.length);
    for(let i=0; i<ans.length;i++){
        ansArray[i]= ans[i].answer;
        console.log(ans[i].answer);
    }
    console.log(ansArray);
    let finalArray=JSON.stringify(ansArray);
    res.end(finalArray); 
       
}).listen(8828);
