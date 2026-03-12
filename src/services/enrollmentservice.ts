import api from "../api/api";
import type { Course } from "../types/Course";
import type { StudentEnrolledCourse } from "../types/StudentEnrolledCourse";

export const getCoursesByStudent = async (studentId: number): Promise<Course[]> => {
    const res = await api.get(`/enrollment/student/${studentId}`);
    return res.data;
};

export const getEnrollmentDetailsByStudent = async (
    studentId: number
): Promise<StudentEnrolledCourse[]> => {
    const res = await api.get(`/enrollment/student/${studentId}/details`);
    return res.data;
};