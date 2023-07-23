import { Metadata } from 'next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="p-20 max-sm:p-4">{children}</main>;
}
export const metadata: Metadata = {
  title: '북스타그램 카드 생성기',
  description: '썸네일과 카드를 생성합니다',
};
