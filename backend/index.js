const express= require('express');
const app=express();
app.use(express.json())



const accrouter=require('./router/account')
app.use('/account',accrouter);




app.listen(3000,()=>{
    console.log('connected')
});
