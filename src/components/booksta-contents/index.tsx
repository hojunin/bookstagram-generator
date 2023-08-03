import React, { useState } from 'react';
import Input from '../input';
import useInput from '@/utils/useInput';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';

const BASE_TAGS = '#북스타그램 #북스타그램📚 #책 #책추천';

const BookstargramContent = ({}) => {
  const { value: title, onChangeInput: onChangeTitle } = useInput();
  const { value: author, onChangeInput: onChangeAuthor } = useInput();
  const { value: tag, onChangeInput: onChangeTag, reset } = useInput();
  const [tags, setTags] = useState([]);

  const onTagKeyDown = (event) => {
    if (event.key === 'Enter') {
      setTags((prev) => [...prev, tag]);
      reset();
    }
  };
  return (
    <div>
      <h2 className="mb-4">콘텐츠 섹션</h2>
      <div className="flex">
        <Input value={title} onChange={onChangeTitle} label="제목" />
        <Input value={author} onChange={onChangeAuthor} label="저자" />
        <Input
          value={tag}
          onChange={onChangeTag}
          onKeyPress={onTagKeyDown}
          label="해시태그"
        />
      </div>
      <CopyToClipboard
        text={`📚 ${title}✍🏻 ${author}📝 ${BASE_TAGS + ' #' + tags.join('# ')}`}
        onCopy={() => alert('복사되었다')}
      >
        <div className="p-4 cursor-pointer">
          <p>
            📚 {title}
            <br />
            ✍🏻 {author}
            <br />
            {BASE_TAGS + ' #' + tags.join('# ')}
          </p>
        </div>
      </CopyToClipboard>
    </div>
  );
};

export default BookstargramContent;
