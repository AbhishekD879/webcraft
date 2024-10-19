import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b w-full mx-auto">
      <div className="px-4 py-3 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary">WebCraft</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/dashboard"
                  className="text-lg font-medium hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button size="lg" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
