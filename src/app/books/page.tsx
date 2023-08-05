import { fetcher } from '@/utils/fetcher';
import React from 'react';

const fetchBooks = async () => {
  try {
    const response = await fetcher({
      path: 'books',
      config: {
        method: 'GET',
      },
    });

    return response;
  } catch (error) {
    return null;
  }
};

const BooksList = async () => {
  const books = await fetchBooks();
  return (
    <ol>
      {books?.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ol>
  );
};

export default BooksList;
