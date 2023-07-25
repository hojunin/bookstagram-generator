'use client';
import React, { useState } from 'react';
import { fetchBook } from './book-search-api';
import OutSideClickDetector from '@/components/outsideClickDetector';

const BookSearch = ({ searchValue, setSearchValue, setThumbnail }) => {
  const [books, setBooks] = useState([]);
  const handleContentsChange = (event) => {
    setSearchValue(event.target?.value ?? '');
  };

  const awaitSeconds = async (second: number) => {
    return new Promise((resolve) => setTimeout(resolve, second));
  };

  const onKeyDownPress = async (event) => {
    if (
      event.key === 'Enter' &&
      typeof searchValue === 'string' &&
      searchValue.length > 0
    ) {
      await awaitSeconds(200);
      const data = await fetchBook(searchValue);

      setBooks(data ?? []);
    }
  };

  const onClickItem = (thumbnail) => {
    setThumbnail(thumbnail);
    handleContentsChange('');
    setBooks([]);
  };

  return (
    <div className="relative ">
      <div className="relative mb-3 mt-3" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="input"
          placeholder="검색어를 입력해주세요"
          onChange={handleContentsChange}
          onKeyDown={onKeyDownPress}
        />
        <label
          htmlFor="input"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          제목으로 검색
        </label>
      </div>
      <OutSideClickDetector onOutsideClick={() => setBooks([])}>
        {books.length > 0 && (
          <ul className="absolute top-12 left-0 z-50 overflow-scroll w-full h-64 rounded-md `transition-opacity duration-500 delay-75">
            {books.map((book) => (
              <li
                className="flex p-2 justify-between bg-blue-200 hover:bg-blue-300 cursor-pointer items-center"
                key={book.title}
                onClick={() => onClickItem(book.image)}
              >
                <p className="text-black">{book.title.slice(0, 15)}</p>
                <img
                  width={60}
                  height={90}
                  src={book.image}
                  alt={`${book.title} 커버 이미지`}
                />
              </li>
            ))}
          </ul>
        )}
      </OutSideClickDetector>
    </div>
  );
};

export default BookSearch;
