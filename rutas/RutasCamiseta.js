const express = require ('express');
const router =  express.Router();
const CamisetaController = require ('../controladores/CamisetaControlador');

router.get('', CamisetaController.ObtenerCamisetas);
router.get('/:id', CamisetaController.ObtenerCamisetaxid);
router.post('/', CamisetaController.CrearCamiseta);
router.put('/:id', CamisetaController.ActualizarCamiseta);
router.delete('/:id', CamisetaController.EliminarCamiseta);

module.exports = router;


