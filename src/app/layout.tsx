"use client";


import NavBar from "../NavBar";
import Footer from "../Footer";
import { UserContextProvider } from "@/context/userContext";



//   title: "Personal Website",
//   description: "John Rundle, cs494",


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        <Footer description="Neat" title="John Rundles Website"/>
      </body>
    </html>
    </UserContextProvider>
  );
}