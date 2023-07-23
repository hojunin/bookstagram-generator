import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const ssurround = localFont({
  src: './../../public/font/Ssurround.woff',
  display: 'swap',
});
const ssurroundAir = localFont({
  src: './../../public/font/Ssurround.woff',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '북스타그램 제조기',
  description: '제조해~~',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ssurround.className}>{children}</body>
    </html>
  );
}
