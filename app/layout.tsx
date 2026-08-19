import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Summit English Institute',
  description: 'Formation intensive en anglais professionnel, informatique et cybersécurité',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
