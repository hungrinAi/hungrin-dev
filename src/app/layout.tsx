import type { Metadata } from 'next';
import '../index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Hungrin',
  description: 'AI-Powered Restaurant Growth',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/assets/logo-icon-512.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
