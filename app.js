const express = require('express')
const app = express();

const path = require('path');

const port = process.env.PORT || 3000;

if(process.env.NODE_ENV === "production") {
    app.use(express.static('build'))
    app.get('*', (req,res) => {
        req.sendFIle(path.resolve(__dirname, 'build', 'index.html'));
    })
}

app.get('/api', (req, res) => {
    res.json({messgae: 'API END'})
})

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log('Server running:', port)
})