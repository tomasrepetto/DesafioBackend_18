import User from '../models/usersModel.js';
import { upload } from '../config/multer.js';


export const uploadUserDocuments = (req, res) => {
    upload.array('documents')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading files', error: err.message });
        }

        try {
            const user = await User.findById(req.params.uid);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const documents = req.files.map(file => ({
                name: file.originalname,
                reference: file.path
            }));

            // Clonar el usuario antes de modificarlo
            const updatedUser = { ...user.toObject(), documents: [...user.documents, ...documents] };

            await User.updateOne({ _id: user._id }, updatedUser);

            res.status(200).json({ message: 'Documents uploaded successfully', documents: updatedUser.documents });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user documents', error: error.message });
        }
    });
};

export const changeUserToPremium = async (req, res) => {
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const requiredDocs = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
        const userDocs = user.documents.map(doc => doc.name);

        const hasAllDocs = requiredDocs.every(doc => userDocs.includes(doc));

        if (!hasAllDocs) {
            return res.status(400).json({ message: 'User has not uploaded all required documents' });
        }

        user.rol = 'premium';
        await user.save();

        res.status(200).json({ message: 'User upgraded to premium' });
    } catch (error) {
        res.status(500).json({ message: 'Error upgrading user to premium', error: error.message });
    }
};
