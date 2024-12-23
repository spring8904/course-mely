"use client";
import { manropeFont } from "@/components/common/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manropeFont.className}  antialiased`}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
      </body>
    </html>
  );
}
