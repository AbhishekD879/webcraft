import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Globe, Layout, BarChart } from "lucide-react";

function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Websites</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Website
        </Button>
      </div>
      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search websites..." className="pl-8" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>My Cool Website {i}</span>
                <Globe className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Last edited 2 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={`/placeholder.svg?height=150&width=300&text=Website ${i} Preview`}
                alt={`Website ${i} preview`}
                className="w-full h-36 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Layout className="mr-1 h-4 w-4" /> 5 pages
                </span>
                <span className="flex items-center">
                  <BarChart className="mr-1 h-4 w-4" /> 1.2k views
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default Page;
