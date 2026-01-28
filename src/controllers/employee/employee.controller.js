import attendanceModel from "../../models/attendance/attendance.model.js";
import Employee from "../../models/employee/employee.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getAllEmployee = async (req, res) => {
    try {
        const employees = await Employee.find().populate("employeeId");
        res.status(200).json(
            new ApiResponse(200, employees, "Employees fetched successfully")
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(
            new ApiResponse(200, employee, "Employee updated successfully")
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
