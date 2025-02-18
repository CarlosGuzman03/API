require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./DB');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Obtener todos los usuarios

//Aqui basta con en Thunder Client poner la URL http://localhost:3000/usuarios y 
// seleccionar el metodo GET y esto hara una consulta a la base de datos y nos 
// devolvera todos los usuarios

app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Obtener un usuario por ID

//Aqui basta con en Thunder Client poner la URL http://localhost:3000/usuarios/NumeroDeID y 
// seleccionar el metodo GET y esto hara una consulta a la base de datos y nos 
// devolvera todos los usuarios con el ID que hayamos introducido

app.get('/usuarios/:id', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(results[0]);
    });
});

//Crear un nuevo usuario

//Aqui basta con en Thunder Client poner la URL http://localhost:3000/usuarios y 
//seleccionar el metodo POST, en la pestaña de Body y le mandaremos la alta del usuario en
//formato JSON como el siguiente:
// {
//     "nombre": "Carlos Guzmán",
//     "correo": "carlosg@email.com",
//     "edad": 26
// }
// y esto hara una alta en la base de datos
app.post('/usuarios', (req, res) => {
    const { nombre, correo, edad } = req.body;
    db.query('INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)',
        [nombre, correo, edad],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, nombre, correo, edad });
        }
    );
});

//Actualizar un usuario

//Aqui basta con en Thunder Client poner la URL http://localhost:3000/usuarios/NumeroDeID y 
// en el "NumeroDeID" de la URL colocaremos el del usuario que queremos modificar, depsues 
//iremos seleccionaremos el metodo PUT y en la pestaña de Body y le mandaremos la modificacion 
// del usuario en formato JSON como el siguiente:
// {
//     "nombre": "Carlos Guzmán",
//     "correo": "carlosg@email.com",
//     "edad": 26
// }
// y esto hara una modificacion en la base de datos del usuario con el ID que hayamos introducido en 
// la URL y con los datos que hayamos introducido en el Body
app.put('/usuarios/:id', (req, res) => {
    const { nombre, correo, edad } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, correo = ?, edad = ? WHERE id = ?',
        [nombre, correo, edad, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Usuario actualizado' });
        }
    );
});

//Eliminar un usuario

//Aqui basta con en Thunder Client poner la URL http://localhost:3000/usuarios/NumeroDeID y 
// seleccionar el metodo DELETE y esto borrara el usuario con el ID que hayamos introducido

app.delete('/usuarios/:id', (req, res) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario eliminado' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// PARA PRUEBAS CON THUNDER CLIENT 