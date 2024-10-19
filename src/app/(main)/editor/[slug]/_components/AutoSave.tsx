import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function AutoSave() {
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (saving) return;

      // Simulate autosave behavior
      setSaving(true);
      console.log("Auto-saving...");

      // Simulate a delay for the saving process (e.g., 5 seconds for API call)
      setTimeout(() => {
        setSaving(false);
        console.log("Save complete");
      }, 2 * 1000); // Simulated API save time (2 seconds)
    }, 10 * 1000); // Autosave every 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [saving]); // `saving` as dependency ensures cleanup and reset

  return (
    <Button onClick={() => null} variant="ghost" size="icon">
      <RotateCcw className={`h-5 w-5 ${saving ? 'animate-spin' : ''}`} />
      <span className="sr-only">Autosave</span>
    </Button>
  );
}
