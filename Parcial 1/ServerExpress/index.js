const express=require('express');
const app=express();
const port=3000;

//Middlewawre de Aplicacion
app.use('/',(req,res,next)=>{
console.log("Peticion al server");
next();
}, (req,res,next)=>{
    console.log("2da funcion middlewawre");
    next();
}
);

// Middleware incorporado en express
app.use(express.json());
app.use(express.text());

app.get('/', (req,res,next)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/', (req,res)=>{
    console.log(req.body)
    res.send("hello");
})

app.use('/', (req,res,next)=>{
    res.status(404);
    res.send("Error 404");
})

app.listen(port,()=>{
    console.log('Server running at http://localhost:3000');
});