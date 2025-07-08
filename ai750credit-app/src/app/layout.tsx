import './globals.css';

export const metadata = {
  title: 'AI750Credit - AI-Powered Credit Repair',
  description: 'Get your credit score to 750+ with AI-powered dispute letters and credit monitoring.',
}

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