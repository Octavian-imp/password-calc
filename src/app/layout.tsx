import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.scss"

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
})
export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400"],
})

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className}  ${inter.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
