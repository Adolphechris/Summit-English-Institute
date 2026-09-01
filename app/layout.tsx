import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PwaRegister } from '@/components/PwaRegister';

export const metadata: Metadata = {
  metadataBase: new URL('https://english.iumorave-ac.org'),
  title: {
    default: 'Summit English Institute — Formation Anglais IT & Cybersécurité',
    template: '%s | Summit English Institute',
  },
  description:
    'Institut de formation intensive en anglais spécialisé pour développeurs, ingénieurs et spécialistes en cybersécurité. 8 niveaux, 20 jours, suivi individuel et certification.',
  keywords: [
    'anglais informatique',
    'cybersécurité anglais',
    'cours anglais développeur',
    'Summit English Institute',
    'IUMORAVE',
    'formation anglais professionnel',
    'anglais technique IT',
  ],
  authors: [{ name: 'Summit English Institute' }],
  creator: 'IUMORAVE Academic Institute',
  publisher: 'IUMORAVE Academic Institute',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://english.iumorave-ac.org',
    siteName: 'Summit English Institute',
    title: 'Summit English Institute — Anglais IT & Cybersécurité',
    description:
      'Master the English language for Software Engineering and Cybersecurity. Program in 20 days with 8 CEFR levels.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Summit English Institute — Anglais IT & Cybersécurité',
    description:
      'Formation accélérée en anglais technique pour développeurs et professionnels de la cybersécurité.',
  },
  alternates: {
    canonical: 'https://english.iumorave-ac.org',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Summit English Institute',
    url: 'https://english.iumorave-ac.org',
    description:
      'Institut de formation intensive en anglais spécialisé pour développeurs, ingénieurs et spécialistes en cybersécurité.',
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'IUMORAVE Academic Institute',
      url: 'https://iumorave-ac.org',
    },
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
