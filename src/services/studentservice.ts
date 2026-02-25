
import api from "../api/api";
import type { Student } from "../types/Student";

// Functions to interact with the student API
export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get('/student');
    return response.data;
}

export const createStudent = async (student: Student): Promise<Student> => {
    const response = await api.post('/student', student);
    return response.data;
}

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
    const response = await api.put(`/student/${id}`, student);
    return response.data;
}

export const deleteStudent = async (id: number): Promise<void> => {
    await api.delete(`/student/${id}`);
}
