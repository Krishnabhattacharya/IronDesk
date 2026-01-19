import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        website: {
            type: String,
        },
        logo: {
            type: String, // URL to logo
        },
        subscriptionStatus: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE', 'TRIAL'],
            default: 'TRIAL',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Company', companySchema);
