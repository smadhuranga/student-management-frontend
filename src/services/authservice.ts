import api from "../api/api";
import type { User } from "../types/User";

// Function to handle user login
export const loginUser = async (user: User) => {
    const response = await api.post('/auth/login', user);
    return response.data;
}
export const register = async (user: User) => {
    const response = await api.post('/auth/register', user);
    return response.data;
}


