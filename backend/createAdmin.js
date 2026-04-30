import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            console.log('Email: admin@admin.com');
            console.log('Password: password123 (or whatever you set previously)');
            process.exit(0);
        }

        const adminUser = new User({
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@admin.com',
            password: 'password123',
            role: 'admin',
            isActive: true
        });

        await adminUser.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@admin.com');
        console.log('Password: password123');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
