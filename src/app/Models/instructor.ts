export interface Instructor {
    Id: string;
    FirstName: string;
    LastName: string;
    Bio: string;
    ProfilePicture?: string;
    Title: string;
    Description: string;
    NoOfCourses: number;
    NoOfStudents: number;
    AvgRating: number;
    NoOfRating: number;
    CreatedAt: Date;
    UpdatedAt: Date;
  }