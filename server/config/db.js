const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');

    // 使用最简单的配置
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://mernuser:mernpassword@mongo:27017/mern-auth?authSource=admin'
    );

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on('connected', () => {
  console.log('🔌 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

module.exports = connectDB;
