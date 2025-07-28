import { createUserService, getAllUsersService, getUserByIdService, updateUserService } from "../models/userModel.js";

//Standardized reposnse strutcture 
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return handleResponse(res, 400, "Name and email are required");
    }
    try {
        const user = await createUserService(name, email);
        handleResponse(res, 201, "User created successfully", user);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const user = await getAllUsersService();
        handleResponse(res, 200, "User fetched sucessfully", user);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await updateUserService(name, email, id);
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User updated successfully", user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await deletUserService(id);
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User deleted successfully", user);
    } catch (error) {
        next(error);
    }
}