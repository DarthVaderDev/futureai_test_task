import { SignOut } from "@/components/Auth";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-xl">My App</h1>
          <SignOut />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
