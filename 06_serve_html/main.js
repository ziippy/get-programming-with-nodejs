const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");

// HTML 파일에 매핑되는 라우트 설정
const routeMap = {
    "/": "views/index.html"
};

const sendErrorResponse = res => {
    res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

const customReadFile = (file_path, res) => {
    if (fs.existsSync(file_path)) {
        fs.readFile(routeMap[req.url], (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res);
    }
};

http.createServer((req, res) => {
    // res.writeHead(httpStatus.StatusCodes.OK, {
    //     "Content-Type": "text/html"
    // });

    // if (routeMap[req.url]) {
    //     fs.readFile(routeMap[req.url], (error, data) => {
    //         res.write(data);
    //         res.end();
    //     });
    // } else {
    //     res.end("<h1>Sorry, not found.</h1>");
    // }

    let url = req.url;
    if (url.indexOf(".html") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/html"
        });
        customReadFile(`./views${url}`, res);
    } else if (url.indexOf(".js") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/javascript"
        });
        customReadFile(`./public/js${url}`, res);
    } else if (url.indexOf(".css") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/css"
        });
        customReadFile(`./public/css${url}`, res);
    } else if (url.indexOf(".png") !== -1) {
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "image/png"
        });
        customReadFile(`./public/image${url}`, res);
    } else {
        sendErrorResponse(res);
    }
}).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
