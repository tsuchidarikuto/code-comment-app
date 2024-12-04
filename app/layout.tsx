import type { Metadata } from "next";
import Head from "next/head";

import "./globals.css";


export const metadata: Metadata = {
  title: "コメント採点",
  description: "コメントを採点するよ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <body className="container mx-auto p-4">                      
        {children}             
    </body>
  </html>
  );
}
