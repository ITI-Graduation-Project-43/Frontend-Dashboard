export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture?: string;
  noOCourses: number;
  noOWishlist: number;
  createdAt: Date;
  updatedAt: Date;
}
