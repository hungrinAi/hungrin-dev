import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Hungrin',
  description: 'AI-Powered Restaurant Growth',
  icons: {
    icon: '/images/robot-thumbsup.jpeg',
    shortcut: '/images/robot-thumbsup.jpeg',
    apple: '/images/robot-thumbsup.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
