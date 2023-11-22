import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      const bookId = match.params.id; // Assuming you use a route parameter for the book ID
      const response = await axios.get(`https://book-finder1.p.rapidapi.com/api/book/${bookId}`, {
        headers: {
          'X-RapidAPI-Key': '1c13e8e686mshcf5aa7fd1bfc0b4p1a0b76jsncc0a6faecb43',
          'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com',
        },
      });

      if (response.status === 200) {
        setBook(response.data);
      }
    };

    fetchBookDetail();
  }, [match.params.id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.summary}</p>
      {/* Render other book details as needed */}
    </div>
  );
};

export default BookDetail;
