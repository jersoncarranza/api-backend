'use strict';
const express = require('express'),
      path    = require('path');
const app = express();
var server_host = process.env.YOUR_HOST || '0.0.0.0';
var PORT        =  process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/ngInterfaz'));
app.listen(PORT,server_host, function(){
    console.log('server start');
})
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/ngInterfaz/index.html'));
});