import api from "../api/api";
import type { Student } from "../types/Student";

export const getStudents = async (sortBy?: string, sortOrder?: string): Promise<Student[]> => {
    const params = new URLSearchParams();
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);
    const response = await api.get('/student', { params });
    return response.data;
};

export const createStudent = async (student: Student): Promise<Student> => {
    const response = await api.post("/student", student);
    return response.data;
};

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
    const response = await api.put(`/student/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    await api.delete(`/student/${id}`);
};

export const getStudentById = async (id: number): Promise<Student> => {
    const response = await api.get(`/student/${id}`);
    return response.data;
};
