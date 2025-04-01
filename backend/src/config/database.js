const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://wakalakasakalaka:jK7ytTAUcct1tG72@cluster0.livvrfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;