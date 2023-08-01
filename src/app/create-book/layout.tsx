export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="p-20">{children}</main>;
}
