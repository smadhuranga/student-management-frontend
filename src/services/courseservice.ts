import api from "../api/api";
import type { Course } from "../types/Course";
import type { Student } from "../types/Student";

export const getCourses = async (sortBy?: string, sortOrder?: string): Promise<Course[]> => {
    const params = new URLSearchParams();

    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);

    const response = await api.get("/courses", { params });
    return response.data;
};

export const createCourse = async (course: Course): Promise<string> => {
    const response = await api.post("/courses", course);
    return response.data;
};

export const updateCourse = async (id: number, course: Course): Promise<string> => {
    const response = await api.put(`/courses/${id}`, course);
    return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
    await api.delete(`/courses/${id}`);
};

export const getCourseById = async (id: number): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
};

export const getCourseStudents = async (courseId: number): Promise<Student[]> => {
    const response = await api.get(`/courses/${courseId}/students`);
    return response.data;
};

export const enrollStudent = async (courseId: number, studentId: number): Promise<any> => {
    const response = await api.post("/enrollments", { courseId, studentId });
    return response.data;
};

export const removeStudent = async (courseId: number, studentId: number): Promise<void> => {
    await api.delete(`/enrollments/${courseId}/${studentId}`);
};

export const removeStudentFromCourse = removeStudent;