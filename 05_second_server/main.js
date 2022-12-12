const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes");

const app = http.createServer();

const getJSONString = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Page</h1>",
    "/about": "<h1>About Page</h1>",
    "/hello": "<h1>Hello Page</h1>",
    "/error": "<h1>Error Page</h1>",
}

app.on("request", (req, res) => {

    // chunk 컨텐츠를 위해
    var body = [];
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });

    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);

    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    })

    // 단순 출력
    // let responseMessage = "<h1>This will show on the screen.</h1>";
    // res.end(responseMessage);

    // 간단 라우팅
    if (routeResponseMap[req.url]) {
        res.end(routeResponseMap[req.url]);
    } else {
        setTimeout(() => {
            res.end("<h1>Welcome!</h1>");
        }, 2000);
    }
    
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);

/*
이를 테스트하기 위해서는 터미널에서 하면 된다.
C:\Users\ziipp>curl --data "username=Jone&password=secret" http://localhost:3000
<h1>This will show on the screen.</h1>
C:\Users\ziipp>
*/
