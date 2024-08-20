import { createLogger, format, transports, addColors } from 'winston';

const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'blue',
        http: 'magenta',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'bold red'
    }
};

addColors(customLevels.colors);

const devLogger = createLogger({
    levels: customLevels.levels,
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new transports.Console({ level: 'debug' })
    ]
});

const prodLogger = createLogger({
    levels: customLevels.levels,
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;

