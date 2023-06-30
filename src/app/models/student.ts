export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture?: string;
  noOfCourses: number;
  noOfWishlist: number;
  createdAt: Date;
  updatedAt: Date;
}
