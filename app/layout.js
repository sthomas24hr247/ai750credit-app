import './globals.css'

export const metadata = {
  title: 'AI750 Credit App',
  description: 'Professional credit application system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
