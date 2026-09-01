//Book Interface
interface Book {
  title: string;
  pages: number;
}

const Book = {
  title: "The Hitchhiker's Guide to the Galaxy",
  pages: 224,
};

const describleBook = (book: Book) => {
  return `The book ${book.title} has ${book.pages} pages.`;
};

console.log(describleBook(Book));

//Combining Interfaces
interface Teacher {
  name: string;
  subject: string;
}

interface Employee {
  id: number;
  email: string;
}

type SchoolTeacher = Teacher & Employee;

const teacher: SchoolTeacher = {
  name: "John",
  subject: "Flower Arranging",
  id: 12345,
  email: "john-the-flower-arranger@bouquet-school.com",
};

const printTeacherInfo = (teacher: SchoolTeacher) => {
  return `${teacher.name} teaches ${teacher.subject}. ${teacher.name}'s school ID is: ${teacher.id}. You can contact ${teacher.name} at: ${teacher.email}.`;
};
console.log(printTeacherInfo(teacher));

//Challenge (optional) Favourite Car
interface Car {
  brand: string;
  year: number;
}

const Car: Car = {
  brand: "Jaguar",
  year: 1994,
};

const printCar = (car: Car) => {
  return `Brand: ${car.brand}, Year: ${car.year}`;
};

console.log(printCar(Car));
