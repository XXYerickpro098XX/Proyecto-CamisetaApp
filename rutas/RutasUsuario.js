const express = require ('express');
const router =  express.Router();
const usuarioController = require ('../controladores/UsuarioControlador');

router.get('', usuarioController.ObtenerUsuarios);
router.get('/:id', usuarioController.ObtenerUsuarioxid);
router.post('/', usuarioController.CrearUsuario);
router.put('/:id', usuarioController.ActualizarUsuario);
router.delete('/', usuarioController.EliminarUsuario);
router.post('/login', usuarioController.Login);

module.exports = router;


