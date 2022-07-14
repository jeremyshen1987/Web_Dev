const http = require('http')
const port = 3000

const express = require('express')
const app = express()
const path = require('path')


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', './index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './public', './about.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, './public', './contact.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public', './404.html'))
})


app.listen(port, () => {
    console.log('listening on port:', port)
})


// function fsWebpage(reqUrl, res){

//     if(reqUrl === '/'){
//         reqUrl = '/index'
//     }

//     fs.readFile(`.${reqUrl}.html`, 'utf-8', (err, data) => {
//         if(err){
//             console.log(err)
//             return
//         }
        
//         res.end(data) 
//     })

// }

// const server = http.createServer((req, res) => {

//     const reqUrl = url.parse(req.url).pathname

//     if(reqUrl === '/' || reqUrl === '/about' || reqUrl === '/contact'){

//         res.statusCode = 200
//         res.setHeader('Content-type', 'text/html')

//         fsWebpage(reqUrl, res)
//         return 
//     }

//     console.log('invalid path selected')

//     res.statusCode = 404
//     res.setHeader('Content-type', 'text/html')
//     fsWebpage('/404', res)
// })

// server.listen(port, () => {
//     console.log('server running on port ', port)
// })