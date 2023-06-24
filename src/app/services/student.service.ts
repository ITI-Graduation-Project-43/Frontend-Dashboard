import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Student } from "../models/student";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private readonly API_URL = "https://localhost:7129/api/Student";
  // "https://api.github.com/repos/angular/angular/issues";

  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  data: Student[] = [];

  constructor(private httpClient: HttpClient) {}

  // get data(): Student[] {
  //   let EXAMPLE_DATA: Student[] = [
  //     {
  //       id: "1",
  //       firstName: "Mohamed",
  //       lastName: "Aly",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "2",
  //       firstName: "Sayed",
  //       lastName: "Hesham",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 25,
  //       numWishlist: 15,
  //       createdAt: new Date("2022-03-01"),
  //       updatedAt: new Date("2022-08-01"),
  //     },
  //     {
  //       id: "3",
  //       firstName: "Mostafa",
  //       lastName: "Elsayed",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 12,
  //       numWishlist: 18,
  //       createdAt: new Date("2022-05-01"),
  //       updatedAt: new Date("2022-06-01"),
  //     },
  //     {
  //       id: "4",
  //       firstName: "essam",
  //       lastName: "Mourtada",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "5",
  //       firstName: "Ahmed",
  //       lastName: "AlAlfy",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "6",
  //       firstName: "Sawsan",
  //       lastName: "Bedier",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "7",
  //       firstName: "Nada",
  //       lastName: "Mohamed",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "8",
  //       firstName: "Alaa",
  //       lastName: "Mandor",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "9",
  //       firstName: "Mohamed",
  //       lastName: "Ibraheem",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "10",
  //       firstName: "Mahmoud",
  //       lastName: "Menyawy",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "11",
  //       firstName: "Abdelrahman",
  //       lastName: "Ouf",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "12",
  //       firstName: "Tarek",
  //       lastName: "Eslam",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "13",
  //       firstName: "Ramadan",
  //       lastName: "Galal",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "14",
  //       firstName: "Mohamed",
  //       lastName: "Sameh",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "15",
  //       firstName: "Raed",
  //       lastName: "Mourad",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "16",
  //       firstName: "Aya",
  //       lastName: "Ahmed",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "17",
  //       firstName: "Sara",
  //       lastName: "Alaa",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "18",
  //       firstName: "Mahmoud",
  //       lastName: "Yasser",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "19",
  //       firstName: "Basel",
  //       lastName: "Atef",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //     {
  //       id: "20",
  //       firstName: "Mohamed",
  //       lastName: "Roshdy",
  //       bio: "John Doe is a computer science professor with over 10 years of teaching experience.",
  //       profilePicture:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       numCourses: 50,
  //       numWishlist: 10,
  //       createdAt: new Date("2022-01-01"),
  //       updatedAt: new Date("2022-01-01"),
  //     },
  //   ];
  //   return EXAMPLE_DATA;
  // }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllStudents(): void {
    this.httpClient.get<any>(this.API_URL).subscribe(
      (res) => {
        this.data = res.items;
        this.dataChange.next(res.items);
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  addStudent(Student: Student): void {
    this.dialogData = Student;
  }

  updateStudent(Student: Student): void {
    this.dialogData = Student;
  }

  deleteStudent(id: number): void {
    console.log(id);
  }
}

/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
