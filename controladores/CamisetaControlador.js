const Camiseta = require('../modelos/CamisetaEsquema');
// Obtener camiseta
exports.ObtenerCamisetas = async (req, res) => {
  try {
    const Camisetas = await Camiseta.find();    // Busca todos los documentos de Camisetas en la BD
    res.json(Camisetas);                       // Responde con la lista en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
  }
};

// Obtener un Camiseta por ID
exports.ObtenerCamisetaxid = async (req, res) => {
  try {
    const Camiseta = await Camiseta.findById(req.params.id); // Busca Camiseta por el ID proporcionado
    if (!Camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrado' }); // Si no existe, 404
    }
    res.json(Camiseta); // Si existe, lo devolvemos en JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear un nuevo Camiseta
exports.CrearCamiseta = async (req, res) => {
  console.log('💬 Datos recibidos del frontend:', req.body);
  try {
    const datosActualizados = req.body;
    
    const nuevoCamiseta = new Camiseta(datosActualizados);
    const CamisetaGuardado = await nuevoCamiseta.save(); // 🔧 Aquí estaba el error
    
    res.status(201).json(CamisetaGuardado);
  } catch (error) {
    console.error('Error en la creación de Camiseta:', error); // Esto ayuda mucho para depurar
    res.status(400).json({ error: 'Error al crear la Camiseta' });
  }
};


// Actualizar un Camiseta existente
exports.ActualizarCamiseta = async (req, res) => {
  try {
    const datosActualizados = req.body;
    const CamisetaActualizado = await Camiseta.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true } // opción new:true para obtener el documento actualizado
    );
    if (!CamisetaActualizado) {
      return res.status(404).json({ error: 'Camiseta no encontrado' });
    }
    res.json(CamisetaActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar Camiseta' });
  }
};

// Eliminar un Camiseta
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

