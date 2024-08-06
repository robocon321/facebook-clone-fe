import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login screen",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="text-gray-600 body-font bg-gray-100">
        <div className="container xl:px-32 px-5 py-36 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold lg:text-7xl text-6xl text-blue-600 text-center md:text-left ">
              facebook
            </h1>
            <p className="leading-relaxed mt-4 lg:text-3xl text-2xl lg:max-w-xl font-medium  text-black text-center md:text-left ">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>
          {children}

          <div className="lg:w-2/6 md:w-1/2 bg-transparent rounded-lg p-8 flex flex-col md:ml-auto w-full mt-3 md:mt-0">
            <p className="text-sm text-gray-700 mt-3 text-center">
              <b>Create a Page</b> for a celebrity, band or business
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="mt-10 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-blue-700 font-bold mb-2">
              Responsive Facebook Login clone © 2023 Created by robocon321
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
