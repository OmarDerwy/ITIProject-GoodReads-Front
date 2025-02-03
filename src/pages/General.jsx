import { useState } from "react";
import { BookShelf } from "../components/general/BookShelf";

function General() {
  {
    /*Fetch top 7 most popular Authors, Books, Categories information from database: 
    Counter of clicked cards information should be stored in db then retrieved */
  }

  {
    /*Dummy data:*/
  }
  const [books, setBooks] = useState([
    { title: "book1", rating: 2.5, views: 100 },
    { title: "book2", rating: 3, views: 200 },
    { title: "book3", rating: 3.5, views: 300 },
    { title: "book4", rating: 2.5, views: 100 },
    { title: "book5", rating: 3, views: 200 },
    { title: "book6", rating: 3.5, views: 300 },
    { title: "book7", rating: 2.5, views: 100 },
  ]);
  const [authors, setAuthors] = useState([
    { title: "author1", views: 100 },
    { title: "author2", views: 200 },
    { title: "author3", views: 300 },
    { title: "author4", views: 100 },
    { title: "author5", views: 200 },
    { title: "author6", views: 300 },
    { title: "author7", views: 100 },
  ]);
  const [categories, setCategories] = useState([
    { title: "category1", views: 100 },
    { title: "category2", views: 200 },
    { title: "category3", views: 300 },
    { title: "category4", views: 100 },
    { title: "category5", views: 200 },
    { title: "category6", views: 300 },
    { title: "category7", views: 100 },
  ]);
  return (
    <>
      <BookShelf title="Popular Books" popular={books} />

      <BookShelf title="Popular Authors" popular={authors} />

      <BookShelf title="Popular Categories" popular={categories} />
    </>
  );
}

export default General;
