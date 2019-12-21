const express = require('express'),
      path    = require('path');
const app = express();

app.use(express.static('./dist/ngInterfaz'));
app.get('/*', (req,res)=>{
    res.sendFile(path.join(___dirname,'/dist/ngInterfaz/index.html'));
});
app.listen(process.env.PORT || 8080, ()=>{
    console.log('server start');
})