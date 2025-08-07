const Camiseta = require('../modelos/CamisetaEsquema');
const usuario = require('../modelos/UsuarioEsquema');

exports.getCamisetas = async (req, res) => {
  try {
    const camisetas = await Camiseta.find();
    const camisetasConUsuario = await Promise.all(
      camisetas.map(async (c) => {
        try {
          // Cambié Usuario por usuario para que coincida con tu variable
          const u = await usuario.findById(c.creador).select('_id nombre correo');
          return {
            ...c.toObject(),
            creador: u || null
          };
        } catch (error) {
          return {
            ...c.toObject(),
            creador: null
          };
        }
      })
    );
    res.json(camisetasConUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.ObtenerCamisetaxid = async (req, res) => {
  try {
    const camiseta = await Camiseta.findById(req.params.id);
    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrado' });
    }
    res.json(camiseta);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.CrearCamiseta = async (req, res) => {
  console.log('💬 Datos recibidos del frontend:', req.body);
  try {
    const nuevoCamiseta = new Camiseta(req.body);
    nuevoCamiseta.creador = req.usuarioid; // mantengo tu variable (ojo mayúscula/minúscula)
    const CamisetaGuardado = await nuevoCamiseta.save();
    res.status(201).json(CamisetaGuardado);
  } catch (error) {
    console.error('Error en la creación de Camiseta:', error);
    res.status(400).json({ error: 'Error al crear la Camiseta' });
  }
};

exports.ActualizarCamiseta = async (req, res) => {
  try {
    const datosActualizados = req.body;
    const CamisetaActualizado = await Camiseta.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true }
    );
    if (!CamisetaActualizado) {
      return res.status(404).json({ error: 'Camiseta no encontrado' });
    }
    res.json(CamisetaActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar Camiseta' });
  }
};

exports.EliminarCamiseta = async (req, res) => {
  try {
    const CamisetaEliminado = await Camiseta.findByIdAndDelete(req.params.id);
    if (!CamisetaEliminado) {
      return res.status(404).json({ error: 'Camiseta no encontrado' });
    }
    res.json({ message: 'Camiseta eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
