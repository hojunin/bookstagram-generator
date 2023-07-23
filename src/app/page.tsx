'use client';
import HomeCard from '@/components/home-card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>북스타그램을 관리해보자</h1>
      <section className="flex w-3/5 justify-between">
        <HomeCard
          title="카드 생성하기"
          description="카드를 만들자"
          onClick={() => push('/bookstargram-generator')}
        />
        <HomeCard
          title="업로드하기"
          description="게시물을 업로드해요"
          onClick={() => push('/bookstargram-upload')}
        />
        <HomeCard
          title="게시글 관리"
          description="게시글 목록을 관리해요"
          onClick={() => push('/bookstargram-list')}
        />
      </section>
    </main>
  );
}
