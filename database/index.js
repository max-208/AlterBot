const http = require('http')
const {wordleDatabase} = require("./wordle_database")
require("dotenv").config();

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.error("API_KEY is not set in the environment variables.");
    process.exit(1);
}

async function sendResponseWithCode(response, code, res){
    res.writeHead(code)
    const message = JSON.stringify({
        code: code,
        message: response
    })
    res.end(message)
}

async function validateParameters(parameterList, inputBody){
    const requiredParameters = parameterList.filter(item => !item.endsWith("?"))
    return requiredParameters.every(item => item in inputBody.params) && inputBody.params.every(item => item in parameterList)
}

const server = http.createServer(async (req, res) => {
    if (req.headers["content-type"] !== "application/json"){
        await sendResponseWithCode("API support only application/json", 400, res)
        return
    }
    switch (req.method.toUpperCase()) {
        case "GET":
        case "PUT":
            let body = "";
            req.on('data', (chunk) => {
                body += chunk;
            })
            let bodyObject
            try {
                bodyObject = JSON.parse(body);
            } catch (e) {
                console.warn(e)
                await sendResponseWithCode("API couldn't parse the json data, please verify syntax", 400, res)
            }
            if (!req.url in wordleDatabase.routes[req.method.toUpperCase()]){
                await sendResponseWithCode("Ressource not found", 404, res)
                return
            }
            const parameterForRoute = wordleDatabase.routes[req.method.toUpperCase()][req.url.slice(1)].params
            if(!await validateParameters(parameterForRoute, bodyObject)) {
                await sendResponseWithCode("Missing or invalid parameters", 400, res)
                return
            }
            wordleDatabase.routes[req.method.toUpperCase()][req.url.slice(1)].func(bodyObject).then(ret => {
                sendResponseWithCode(ret, 200, res)
            }).catch(err => {
                console.error(err)
                sendResponseWithCode(err, 500, res)
            })
            break
        default:
            await sendResponseWithCode("Allowed method are : GET/PUT", 405, res)
            return
    }
})

server.listen(25175, "0.0.0.0", () =>{
    console.log(`Server started on port ${server.address().port}`);
})
