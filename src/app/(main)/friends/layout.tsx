import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RelationshipProvider from "./_providers/RelationshipProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook | Friends",
  description: "Friends screen",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RelationshipProvider>
      <div className="w-full h-full grid grid-cols-12">{children}</div>
    </RelationshipProvider>
  );
}
