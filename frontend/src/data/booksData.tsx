import { IonImg } from "@ionic/react";

export const popularBooks = [
  {
    src: "book1.png",
    alt: "Harry Potter",
    title: "Harry Potter",
    author: "J.K. Rowling",
  },
  {
    src: "book4.png",
    alt: "Moby Dick",
    title: "Moby Dick",
    author: "Herman Melville",
  },
];

export const detectiveBooks = [
  {
    src: "book2.png",
    alt: "Harry Potter",
    title: "Harry Potter",
    author: "J.K. Rowling",
  },
  {
    src: "book3.png",
    alt: "Moby Dick",
    title: "Moby Dick",
    author: "Herman Melville",
  },
];

export const renderBooks = (
  books: Array<{ src: string; alt: string; title: string; author: string }>
) => {
  return books.map((book, index) => (
    <div className="book-item" key={index}>
      <IonImg src={book.src} alt={book.alt} className="img"></IonImg>
      <h2 style={{ color: "#7B635A", fontWeight: "bold" }}>{book.title}</h2>
      <p style={{ color: "#7B635A" }}>{book.author}</p>
    </div>
  ));
};
