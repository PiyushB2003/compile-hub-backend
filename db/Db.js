import mongoose from "mongoose";

const MongoConnect = async () => {
    try {
        // Connect to MongoDB using the connection URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        // Log any errors that occur during the connection attempt
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with a failure code
    }
};

export default MongoConnect;
