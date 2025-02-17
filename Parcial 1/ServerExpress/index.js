// const express=require('express');
// const app=express();
// const port=3000;
// const multer = require( 'multer');
xmlparser = require('express-xml-bodyparser');



// //Middlewawre de Aplicacion
// app.use('/',(req,res,next)=>{
// console.log("Peticion al server");
// next();
// }, (req,res,next)=>{
//     console.log("2da funcion middlewawre");
//     next();
// }
// );

// // Middleware incorporado en express
// app.use(express.json());
// app.use(express.text());


// // app.get('/alumnos', (req,res,next)=>{
// //     console.log(req.query)
// //     res.sendFile(__dirname+'/index.html');
// // })

// // app.patch ('/maestros', (req,res)=>{
// //     console.log(req.params)
// //     res.send("hello");
// // })



// app.listen(port,()=>{
//     console.log('Server running at http://localhost:3000');
// });

// //.query .params .body

// // 1
// //Cadena de Consulta - Correcto
// app.get('/alumnos', (req,res,next)=>{
//     console.log(req.query)
//     res.sendFile(__dirname+'/Public/index.html');
// })

// //2
// //Parte de la Ruta
// app.patch ('/Sistemas/:control', (req,res)=>{
//     console.log(req.params)
//     res.sendFile(__dirname+'/public/index.html');
// })

// app.post ('/prefectos', (req,res)=>{
//     console.log(req.body)
//     res.send("Hello")
// })

// //3
// //Body (Json/Text)
// app.patch ('/maestros', (req,res)=>{
//     console.log(req.body)
//     res.send("52526");
// })

// const folder = path. join( dirname+ ' /ArchivosRecibidos/');
// const upload = multer({dest: ArchivosRecibidos});

// app.use(upload.single('archivo'));

// app.post('/usuario', (req,res)=>{
//     console.log('Se recibio el archivo : ${req.file.originalname}');
//     console.log(req.body);
//     console. log( 'Se recibio eI formulario: ' + JSON.stringify(req.body));
//     res.json(req.body)
// })


// app.use('/', (req,res,next)=>{
//     res.status(404);
//     res.send("Error 404");
// })


const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
app.use(xmlparser());

// Middleware de Aplicación
app.use('/', (req, res, next) => {
    console.log("Petición al server");
    next();
}, (req, res, next) => {
    console.log("2da función middleware");
    next();
});
app.post ('/prefectos', (req,res)=>{
    console.log(req.body)
    res.send("Hello")
})
// Middleware incorporado en express
app.use(express.json());
app.use(express.text());

// Verificar si la carpeta existe, sino la creamos
const folder = path.join(__dirname, 'ArchivosRecibidos');
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Configuración de multer para guardar archivos en la carpeta especificada
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Guarda el archivo con su nombre original
    }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post('/usuario', upload.single('archivo'), (req, res) => {
    if (req.file) {
        console.log(`Se recibió el archivo: ${req.file.originalname}`);
        console.log('Detalles del archivo:', req.file);
        res.send(`Archivo ${req.file.originalname} subido correctamente.`);
    } else {
        console.log('No se recibió ningún archivo.');
        res.status(400).send('No se recibió ningún archivo.');
    }
});

// Middleware de error 404 al final
app.use((req, res, next) => {
    res.status(404).send("Error 404");
});

// Manejo de errores de Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send(`Error de Multer: ${err.message}`);
    } else {
        res.status(500).send(`Error interno del servidor: ${err.message}`);
    }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log('Server running at http://localhost:3000');
});