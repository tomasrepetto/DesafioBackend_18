export const getSomeData = async (req, res) => {
    try {
        res.status(200).json({ message: 'Datos obtenidos correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};