import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Hungrin',
  description: 'AI-Powered Restaurant Growth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
