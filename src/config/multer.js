import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definir __dirname manualmente para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para asegurar que la carpeta exista
const ensureDirectoryExistence = (filePath) => {
    const dir = path.dirname(filePath);
    if (fs.existsSync(dir)) {
        return true;
    }
    fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'documents';
        if (file.fieldname === 'profile') {
            folder = 'profiles';
        } else if (file.fieldname === 'product') {
            folder = 'products';
        }

        const dirPath = path.join(__dirname, `../../uploads/${folder}`);
        ensureDirectoryExistence(dirPath);

        cb(null, dirPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage });


