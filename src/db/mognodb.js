import mongoose from 'mongoose';

const connectionToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected with server: ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(error);
    }
}
export default connectionToDb;