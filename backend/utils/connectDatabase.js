import mongoose from "mongoose";

export default class ConnectDb {
    async connectDb() {
        try {
            if (mongoose.connections[0].readyState) {
                return;
            }
            await mongoose.connect(process?.env?.DB_URL)
            console.log(`connected db was successfull`)
        }
        catch (error) {
            console.log(error?.message)
        }
    }
}