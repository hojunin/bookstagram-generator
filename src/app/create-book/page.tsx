'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { fetcher } from '@/utils/fetcher';
import useInput from '@/utils/useInput';
import React, { useState } from 'react';

const CreateBook = () => {
  const { value: title, onChangeInput: onChangeTitle } = useInput();
  const { value: author, onChangeInput: onChangeAuthor } = useInput();
  const { value: coverImage, onChangeInput: onChangeCoverImage } = useInput();
  const { value: quickDescription, onChangeInput: onChangeQuickDescription } =
    useInput();
  const { value: description, onChangeInput: onChangeDescription } = useInput();
  const { value: brunchLink, onChangeInput: onChangeBrunchLink } = useInput();
  const { value: instagramLink, onChangeInput: onChangeInstagramLink } =
    useInput();
  const { value: status, onChangeInput: onChangeStatus } = useInput();
  const { value: rating, onChangeInput: onChangeRating } = useInput();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      title,
      author,
      coverImage,
      quickDescription,
      description,
      links: {
        brunch: brunchLink,
        instagram: instagramLink,
      },
      tags: {
        status,
        rating: Number(rating),
      },
    };

    fetcher({
      path: 'books',
      config: {
        method: 'POST',
        body: JSON.stringify(bookData),
        mode: 'no-cors',
      },
    });
  };

  return (
    <div>
      <h1>책 리스트 추가</h1>
      <div className="flex mr-10">
        <form
          className="grid grid-cols-2 gap-x-3 gap-y-2 p-5"
          onSubmit={handleSubmit}
        >
          <Input value={title} onChange={onChangeTitle} label="제목" />
          <Input value={author} onChange={onChangeAuthor} label="작가" />
          <Input
            value={coverImage}
            onChange={onChangeCoverImage}
            label="커버 이미지 URL"
          />
          <Input
            value={quickDescription}
            onChange={onChangeQuickDescription}
            label="간단한 설명"
          />
          <Input
            value={description}
            onChange={onChangeDescription}
            label="상세 설명"
          />
          <Input
            value={brunchLink}
            onChange={onChangeBrunchLink}
            label="Brunch 링크"
          />
          <Input
            value={instagramLink}
            onChange={onChangeInstagramLink}
            label="Instagram 링크"
          />
          <Input value={status} onChange={onChangeStatus} label="상태" />
          <Input value={rating} onChange={onChangeRating} label="평점" />
          <Button label="추가하기" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
