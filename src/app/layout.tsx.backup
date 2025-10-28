// This file is needed for Next.js but we're using the [lang] layout as our actual root layout
// to support internationalization. However, we'll include html and body tags as a fallback.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
