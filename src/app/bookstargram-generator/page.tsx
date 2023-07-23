'use client';
import Button from '@/components/button';
import ColorPicker from '@/components/colorpicker';
import CloseIcon from '@/components/icons/close';
import Input from '@/components/input';
import Loader from '@/components/loader';
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
  const [contents, setContents] = useState();
  const [contentsList, setContentsList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
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
      // canvas 객체를 이미지로 변환 (기본적으로 PNG 형식으로 저장)
      const image = canvas.toDataURL('image/png');

      // 이미지 다운로드 등의 원하는 작업 수행
      // 여기에서는 이미지 다운로드 링크를 생성하여 사용자에게 다운로드할 수 있도록 함
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured_component.png';
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
    // canvas 객체를 이미지로 변환 (기본적으로 PNG 형식으로 저장)
    const image = canvas.toDataURL('image/png');

    // 이미지 다운로드 등의 원하는 작업 수행
    // 여기에서는 이미지 다운로드 링크를 생성하여 사용자에게 다운로드할 수 있도록 함
    const link = document.createElement('a');
    link.href = image;
    link.download = `card_${index}.png`;
    link.click();
  };

  const downloadWholeContents = async () => {
    setIsLoading(true);
    try {
      if (contentsList.length === 0) {
        return;
      }
      setActiveIndex(0);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (let i = 0; i < contentsList.length; i++) {
        setActiveIndex(i);
        await handleCaptureContents(i);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-0 mx-auto px-20">
      <h1 className="">북스타그램 카드 제작 도우미</h1>
      <div className="flex items-center my-6">
        <Input
          label="썸네일"
          value={thumbnail}
          onChange={handleThumbnailChange}
          style={{ marginRight: 10 }}
        />
        <Input
          label="컨텐츠"
          value={contents}
          onChange={handleContentsChange}
          onKeyPress={handleKeyPress}
        />
        {/* <ColorPicker /> */}
      </div>
      <section className="flex m-5 overflow-x-scroll">
        <div>
          <div
            ref={thumbnailRef}
            className="bg-lime-200 w-96 h-96 flex items-center justify-center mr-10 p-10"
          >
            {isValidURL(thumbnail) ? (
              <img className="w-40 h-56" src={thumbnail} alt="썸네일" />
            ) : (
              <p className="text-gray-800 text-3xl text-center leading-10">
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

        <div>
          <div
            ref={contentsRef}
            className="bg-lime-200 w-96 h-96 flex items-center justify-center mr-10 p-10"
          >
            <p className="text-gray-800 text-3xl text-center leading-10">
              {activeIndex >= 0
                ? contentsList[activeIndex]
                : '선택된 컨텐츠가 없어요'}
            </p>
          </div>
          <Button
            label="컨텐츠 다운로드"
            style={{ marginRight: 10, marginTop: 30 }}
            onClick={downloadWholeContents}
          />
        </div>

        <ol className="w-80">
          {contentsList.map((content, index) => (
            <li
              className="flex items-center justify-between w-full bg-slate-600 p-2 cursor-pointer"
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
