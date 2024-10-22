import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  side: "left" | "right";
  children: React.ReactNode;
}

export function Sidebar({ isOpen, setIsOpen, side, children }: SidebarProps) {
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`relative bg-white border-${side} transition-all duration-300 ${
        isOpen ? "w-64" : "w-12"
      }`}
    >
      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      {isOpen && children}
    </div>
  );
}
