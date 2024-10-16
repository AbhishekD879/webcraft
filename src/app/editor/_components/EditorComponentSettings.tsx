import { Button } from "@/components/ui/button";
import { SettingsIcon, X } from "lucide-react";

export default function EditorComponentSettings() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <SettingsIcon className="h-5 w-5 mr-2" />
          Element Settings
        </h3>
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
