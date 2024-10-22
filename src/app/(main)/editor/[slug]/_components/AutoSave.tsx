import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { saveEditorState } from "@/lib/api/editorApi";
import { usePathname } from "next/navigation";

interface AutoSaveProps {
  editorRef: React.RefObject<HTMLDivElement>;
  query: any;
}

export default function AutoSave({ editorRef, query }: AutoSaveProps) {
  const [saving, setSaving] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (saving) return;

      setSaving(true);
      console.log("Auto-saving...");

      try {
        if (!editorRef.current?.firstChild?.firstChild) {
          console.error("Error: Unable to access editor content");
          return;
        }

        // @ts-ignore
        const html = editorRef.current.firstChild.firstChild.outerHTML;
        const success = await saveEditorState(pathname.split("/")[2], query.serialize(), html);

        if (success) {
          console.log("Autosave successful");
        } else {
          console.error("Autosave failed");
        }
      } catch (error) {
        console.error("Error during autosave:", error);
      } finally {
        setSaving(false);
      }
    }, 30 * 1000); // Autosave every 30 seconds

    return () => clearInterval(interval);
  }, [saving, editorRef, query, pathname]);

  return (
    <Button variant="ghost" size="icon">
      <RotateCcw className={`h-5 w-5 ${saving ? 'animate-spin' : ''}`} />
      <span className="sr-only">Autosave</span>
    </Button>
  );
}
