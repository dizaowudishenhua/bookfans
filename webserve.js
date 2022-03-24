const express = require('express')
const child_process = require('child_process');
const fs = require('fs')
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');

const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());
app.use((req, res, next) => {
    if (req.cookies.zs == "ls") {
        res.cookie('zs', "ls", {
            expires: new Date(Date.now() + 9000000000),
            httpOnly: true
        })
        next()

    } else {
        res.sendFile(path.join(__dirname, "./bookfans/reject.html"))
    }

})
app.use(express.static('bookfans'))




app.get('/book', (req, res) => {
    console.log((req.query.id));
    const output = child_process.execSync('python ' + path.join(__dirname, './crawler/getWebBook.py'), {
        input: req.query.id,
        encoding: 'utf-8',

    })
    res.status(200)

    res.send(output)
    console.log('返回成功');
})

app.get('/content', (req, res) => {


    console.log(decodeURI(req.url));
    const output = child_process.execSync('python ' + path.join(__dirname, './crawler/getBookContent.py'), {
        input: encodeURI(req.query.bookname),
        encoding: 'utf8',

    })
    res.status(200)
    res.send(output)
    // console.log(output);


})








































app.post('/test', (req, res) => {
    console.log(req.ip);
    for (item in req.body) {
        console.log(req.body[item]);
        fs.appendFile('./test.txt', data = req.body[item] + '\r\n', options = 'utf8', callback = (err) => {

        })

    }
    console.log(req.body);
    res.send('上传成功')
})


app.get('/test', (req, res) => {

    let testPath = path.join(__dirname, './test.html')
    res.sendFile(testPath)

})



app.use((err, req, res, next) => {
    res.status(502)
    console.log(err);
    res.send(err)
})
app.listen(80, () => {
    console.log('webserve running as http://127.0.0.1:80');
})