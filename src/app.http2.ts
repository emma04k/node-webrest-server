import http2 from "http2";
import fs from "fs";

const  server = http2.createSecureServer({
    key : fs.readFileSync('./keys/server.key'),
    cert : fs.readFileSync('./keys/server.crt'),
},(req, res) => {
    console.log(req.url);
    // const data = { name : "David Ortega", age : 35, city: "Bogota" };
    // res.writeHead(200, {"Content-Type": "application/json"});
    // res.end( JSON.stringify(data) );

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(htmlFile);
        return;
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {"Content-Type": "application/javascript"});
    } else if(req.url?.endsWith('.css')){
        res.writeHead(200, {"Content-Type": "text/css"});
    }
    try {
        const contentResponse = fs.readFileSync(`./public/${req.url}`, 'utf8');
        res.end(contentResponse);
    }catch (err){
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end();
    }


});

server.listen(8081, () => {
    console.log("Server listening on 8081");
});

