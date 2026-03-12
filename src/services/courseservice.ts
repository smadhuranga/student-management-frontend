import api from "../api/api";
import type { Course } from "../types/Course";
import type { CourseStudent } from "../types/CourseStudent";

export const getCourses = async (): Promise<Course[]> => {
    const res = await api.get("/courses");
    return res.data;
};

export const createCourse = async (course: Course): Promise<Course> => {
    const res = await api.post("/courses", course);
    return res.data;
};

export const updateCourse = async (id: number, course: Course): Promise<Course> => {
    const res = await api.put(`/courses/${id}`, course);
    return res.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
    await api.delete(`/courses/${id}`);
};

export const getCourseStudents = async (courseId: number): Promise<CourseStudent[]> => {
    const res = await api.get(`/enrollment/course/${courseId}/details`);
    return res.data;
};

export const enrollStudent = async (courseId: number, studentId: number): Promise<void> => {
    await api.post(`/enrollment/enroll`, null, {
        params: { studentId, courseId },
    });
};

export const removeStudent = async (courseId: number, studentId: number): Promise<void> => {
    await api.delete(`/enrollment/remove`, {
        params: { studentId, courseId },
    });
};