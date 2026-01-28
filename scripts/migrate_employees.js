import mongoose from 'mongoose';
import Employee from '../src/models/employee/employee.model.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') }); // Explicitly load .env from root

const runMigration = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected.");

        // Hardcoded Company ID from your logs (Admin's company)
        const ADMIN_COMPANY_ID = "696a39e856cb6631ccdfdcdb";

        console.log(`Searching for employees without company...`);
        const result = await Employee.updateMany(
            { company: { $exists: false } }, // Filter: Company field missing
            { $set: { company: ADMIN_COMPANY_ID } } // Update: Set to Admin's company
        );

        console.log("Migration Result:", result);
        console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

        process.exit(0);
    } catch (error) {
        console.error("Migration Failed:", error);
        process.exit(1);
    }
};

runMigration();
