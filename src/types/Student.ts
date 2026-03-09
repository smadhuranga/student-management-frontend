// Define the Student interface to represent the structure of student datasuitable as
export type Student = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    enrollmentDate: string;
    courseIds?: number[];
    courses?: { id: number; name: string }[];
};