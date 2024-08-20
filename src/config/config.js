import mongoose from 'mongoose';

export const dbConnection = async () => {
    try{
        await mongoose.connect(`mongodb+srv://tomasrepetto:tomas2315@codercluster.qtz5cyl.mongodb.net/ecommerce`);
        console.log(`Base de datos online!`)
    } catch (error){
        console.log(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}