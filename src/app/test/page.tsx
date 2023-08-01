'use client';
import React, { useEffect, useState } from 'react';
import * as ThumbHash from '@/utils/thumbhash';

const convert = (uint8ArrayData: Uint8Array) => {
  const numberArray = Array.from(uint8ArrayData);

  // 단계 2: 일반 숫자 배열에서 새로운 Uint8Array를 만듭니다.
  const uint8Array = new Uint8Array(numberArray);

  const base64String = btoa(String.fromCharCode(...uint8Array));

  console.log(base64String); // UTF-8로 인코딩된
};

const Test = () => {
  const [thumbnail, setThumbnail] = useState('');
  const generateThumbHash = async () => {
    const originalURL = 'http://localhost:3000/icons/hojun.jpeg';
    const image = new Image();
    image.src = originalURL;
    await new Promise((resolve) => (image.onload = resolve));
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) {
      return;
    }
    const scale = 100 / Math.max(image.width, image.height);
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const binaryThumbHash = ThumbHash.rgbaToThumbHash(
      pixels.width,
      pixels.height,
      pixels.data,
    );
    convert(binaryThumbHash);
    // ThumbHash to data URL
    const placeholderURL = ThumbHash.thumbHashToDataURL(binaryThumbHash);
    setThumbnail(placeholderURL);
  };
  useEffect(() => {
    generateThumbHash();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex p-10">
        <div className="mr-10 flex flex-col items-center">
          <img
            src={'icons/hojun.jpeg'}
            alt="이거 나야"
            width={200}
            height={200}
          />
          <p className="mt-3">일반 사진</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={thumbnail} alt="이거 나야" width={200} height={200} />
          <p className="mt-3">ThumbHash 사진</p>
        </div>
      </div>
    </div>
  );
};

export default Test;
