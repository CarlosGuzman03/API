const express = require('express');
const db = require('../Config/DB');
const router = express.Router();

const PostUsuario = require('../Controller/Post');
const DeleteUsuario = require('../Controller/Delete');
const GetUsuario = require('../Controller/Get');
const UpdateUsuario = require('../Controller/Update');

router.post('/create', PostUsuario);
router.delete('/delete/:id', DeleteUsuario);
router.get('/get', GetUsuario);
router.put('/update/:id', UpdateUsuario);

module.exports = router;
