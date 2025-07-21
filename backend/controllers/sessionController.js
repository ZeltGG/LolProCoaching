const CoachingRequest = require('../models/CoachingRequest');

// 📌 Crear nueva solicitud de coaching
exports.createRequest = async (req, res) => {
  console.log('🧠 Usuario autenticado en sesión:', req.user);

  try {
    const { title, description, date, time, duration } = req.body;

    // 🛑 Validación de campos obligatorios
    if (!title || !description || !date || !time || !duration) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // 🔢 Validar duración entre 60 y 120 minutos
    const durationInt = parseInt(duration, 10);
    if (isNaN(durationInt) || durationInt < 60 || durationInt > 120) {
      return res.status(400).json({ message: 'La duración debe estar entre 60 y 120 minutos.' });
    }

    // ✅ Crear nueva solicitud
    const newRequest = new CoachingRequest({
      title,
      description,
      date,
      time,
      duration: durationInt,
      userId: req.user.id
    });

    await newRequest.save();

    return res.status(201).json({
      message: '✅ Solicitud creada con éxito',
      request: newRequest
    });
  } catch (error) {
    console.error('❌ Error al crear la solicitud:', error);
    return res.status(500).json({ message: 'Error en el servidor al crear la solicitud.' });
  }
};

// 📌 Obtener todas las solicitudes del usuario autenticado
exports.getRequests = async (req, res) => {
  try {
    const requests = await CoachingRequest.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    return res.status(500).json({ message: 'Error en el servidor al obtener las solicitudes.' });
  }
};