const express = require('express');
const db = require('../Config/DB');
const router = express.Router();

const PostUsuario = require('../Controller/Post');
const DeleteUsuario = require('../Controller/Delete');
const GetUsuario = require('../Controller/Get');
const UpdateUsuario = require('../Controller/Update');

// Crear un nuevo usuario
router.post('/create', PostUsuario);

// Eliminar un usuario por ID
router.delete('/delete/:id', DeleteUsuario);

// Obtener todos los usuarios
router.get('/get', GetUsuario);

// Obtener un usuario específico por ID (para enlaces HATEOAS)
router.get('/get/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(result[0]);  // Enviar solo el usuario encontrado
    });
});

// Actualizar un usuario por ID
router.put('/update/:id', UpdateUsuario);

module.exports = router;
