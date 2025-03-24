// This file is needed for Next.js but we're using the [lang] layout as our actual root layout
// to support internationalization. This file should not render html or body elements.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
