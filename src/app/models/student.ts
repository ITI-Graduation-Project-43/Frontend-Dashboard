export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture?: string;
  numCourses: number;
  numWishlists: number;
  createdAt: Date;
  updatedAt: Date;
}
