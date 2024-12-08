import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "コメント採点",
  description: "コメントを採点するよ",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="container mx-auto p-4">                      
        {children}             
      </body>
    </html>
  );
}
