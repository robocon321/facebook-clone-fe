import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProfileProvider from "./_providers/ListFriendProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook | Requests to make friends",
  description: "Friends screen",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
