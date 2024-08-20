class CustomError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

const errorDictionary = {
    'ValidationError': {
        message: 'Validation Error',
        status: 400
    },
    'MissingFieldsError': {
        message: 'Missing required fields',
        status: 400
    },
    // Otros errores comunes
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const error = errorDictionary[err.name] || { message: 'Internal Server Error', status: 500 };
    res.status(error.status).json({ message: error.message, details: err.message });
};

export { CustomError, errorHandler, errorDictionary };
