## Mongoose
## Nodemailer
## CookieParser
## JWT
## bcrypt

import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;


# Connecting to Frontend
http://localhost:8080/hello