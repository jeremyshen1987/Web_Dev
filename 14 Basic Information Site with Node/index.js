const http = require('http')
const port = 3000
const url = require('url')

const fs = require('fs')



function fsWebpage(reqUrl, res){

    if(reqUrl === '/'){
        reqUrl = '/index'
    }

    fs.readFile(`.${reqUrl}.html`, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            return
        }
        
        res.end(data) 
    })

}

const server = http.createServer((req, res) => {

    const reqUrl = url.parse(req.url).pathname

    if(reqUrl === '/' || reqUrl === '/about' || reqUrl === '/contact'){

        res.statusCode = 200
        res.setHeader('Content-type', 'text/html')

        fsWebpage(reqUrl, res)
        return 
    }

    console.log('invalid path selected')

    res.statusCode = 404
    res.setHeader('Content-type', 'text/html')
    fsWebpage('/404', res)
})

server.listen(port, () => {
    console.log('server running on port ', port)
})