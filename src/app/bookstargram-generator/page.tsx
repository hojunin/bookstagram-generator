'use client';
import BookSearch from '@/components/book-search/Index';
import Button from '@/components/button';
import ColorPicker from '@/components/colorpicker';
import CloseIcon from '@/components/icons/close';
import Input from '@/components/input';
import Loader from '@/components/loader';
import Slider from '@/components/slider';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

function isValidURL(url: string | null) {
  if (!url) {
    return false;
  }
  // URL을 검사하기 위한 정규식
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)' + // 프로토콜(http:// 또는 https://)
      '(([a-zA-Z0-9\\.-]+)' + // 도메인 (예: www.example.com)
      '(\\.[a-zA-Z]{2,})' + // 최상위 도메인 (예: .com, .net, .co.kr 등)
      ')(:[0-9]{2,5})?' + // 포트번호 (선택사항)
      '([\\/\\w\\.-]*)*' + // 경로 및 쿼리 문자열 (선택사항)
      '(\\?[\\w\\&%\\.-=]*)?' + // 쿼리 파라미터 (선택사항)
      '$',
  );

  return urlPattern.test(url);
}

const BookStagramGenerator = () => {
  const [thumbnail, setThumbnail] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [contents, setContents] = useState();
  const [contentsList, setContentsList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [contentsSize, setContentsSize] = useState(30);

  const [cardColor, setCardColor] = useState('#D9F99D');

  const thumbnailRef = useRef<HTMLDivElement | null>(null);
  const contentsRef = useRef<HTMLDivElement | null>(null);

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.value);
  };
  const handleContentsChange = (event) => {
    setContents(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (
      event.key === 'Enter' &&
      typeof contents === 'string' &&
      contents.length > 0
    ) {
      setContentsList((prev) => [...prev, contents]);
      setContents(''); // 입력된 컨텐츠를 비워줌
      setActiveIndex((prev) => prev + 1); // activeIndex를 업데이트하여 선택된 컨텐츠를 표시
    }
  };

  const onClickItem = (index: number) => {
    setActiveIndex(index);
    const target = contentsList[index];
  };

  const onClickDrop = (targetIndex: number) => {
    const target = [...contentsList].filter(
      (_, index) => index !== targetIndex,
    );
    setContentsList(target);
  };

  const handleCapture = async () => {
    setIsLoading(true);
    try {
      if (!thumbnailRef.current || !isValidURL(thumbnail)) return;
      // 컴포넌트를 이미지로 캡처하여 canvas 객체로 변환
      const canvas = await html2canvas(thumbnailRef.current, {
        useCORS: true,
        imageTimeout: 1000,
      });
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = 'thumbnail.png';
      link.click();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptureContents = async (index: number) => {
    if (!contentsRef.current) return;
    // 컴포넌트를 이미지로 캡처하여 canvas 객체로 변환
    const canvas = await html2canvas(contentsRef.current, {
      useCORS: true,
      imageTimeout: 1000,
    });
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = `card_${index + 1}.png`;
    link.click();
  };

  const awaitSeconds = async (second: number) => {
    return new Promise((resolve) => setTimeout(resolve, second));
  };

  const downloadWholeContents = async () => {
    setIsLoading(true);
    setActiveIndex(0);

    await awaitSeconds(500);

    try {
      if (contentsList.length === 0) {
        return;
      }

      await awaitSeconds(500);

      for (let i = 0; i < contentsList.length; i++) {
        setActiveIndex(i);
        await awaitSeconds(300);
        await handleCaptureContents(i);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSliderChange = (event) => {
    setContentsSize(parseInt(event.target.value));
  };

  return (
    <div className="my-0 mx-auto px-20 max-sm:p-0">
      <h1 className="">북스타그램 카드 제작 도우미</h1>
      <section className="flex m-5 overflow-x-scroll max-sm:flex-col">
        <div className="mr-10">
          <Input
            label="썸네일"
            value={thumbnail}
            onChange={handleThumbnailChange}
            style={{ marginRight: 10, marginBottom: 20 }}
          />
          <div
            ref={thumbnailRef}
            className="w-96 h-96 flex items-center justify-center"
            style={{ backgroundColor: cardColor }}
          >
            {isValidURL(thumbnail) ? (
              <img className="w-40 h-56" src={thumbnail} alt="썸네일" />
            ) : (
              <p
                className="text-gray-800 text-center leading-10"
                style={{ fontSize: contentsSize }}
              >
                썸네일용 사진이 없습니다
              </p>
            )}
          </div>
          <Button
            label="썸네일 다운로드"
            style={{ marginRight: 10, marginTop: 30 }}
            onClick={handleCapture}
          />
        </div>

        <div className="mr-10">
          <div className="flex items-center mb-5 justify-between">
            <Input
              label="컨텐츠"
              value={contents}
              onChange={handleContentsChange}
              onKeyPress={handleKeyPress}
            />
            <ColorPicker
              selectedColor={cardColor}
              setSelectedColor={setCardColor}
            />
            <Slider value={contentsSize} setValue={handleSliderChange} />
          </div>
          <div
            ref={contentsRef}
            className="w-96 h-96 flex items-center justify-center p-10"
            style={{ backgroundColor: cardColor }}
          >
            <p
              className="text-gray-800 text-center"
              style={{
                fontSize: contentsSize,
                lineHeight: 1,
              }}
            >
              {activeIndex >= 0
                ? contentsList[activeIndex]
                : '선택된 컨텐츠가 없어요'}
            </p>
          </div>
          <div className="flex justify-between">
            <Button
              label="한번에 다운로드"
              style={{ marginRight: 10, marginTop: 30 }}
              onClick={downloadWholeContents}
            />
            <Button
              label="이것만 다운로드"
              style={{ marginRight: 10, marginTop: 30 }}
              onClick={() => handleCaptureContents(activeIndex)}
            />
          </div>
        </div>

        <ol className="w-80">
          <h6 className="mb-5">컨텐츠 목록</h6>
          {contentsList.map((content, index) => (
            <li
              className="flex items-center justify-between w-full bg-slate-500 rounded-md mb-1 p-2 cursor-pointer"
              onClick={() => onClickItem(index)}
              key={content}
            >
              <p>{content}</p>
              <button
                onClick={() => onClickDrop(index)}
                className="cursor-pointer"
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ol>
      </section>

      <Loader visible={isLoading} />
    </div>
  );
};

export default BookStagramGenerator;
