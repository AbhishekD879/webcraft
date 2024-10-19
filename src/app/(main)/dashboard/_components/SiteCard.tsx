import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Globe, Layout } from "lucide-react";
import Link from "next/link";

export default function SiteCard({
  id,
  name,
  userId,
  url,
  subdomain,
}: {
  name: string | null;
  id: string;
  userId: string | null;
  url: string | null;
  subdomain: string | null;
}) {
  return (
    <Link href={`/editor/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{name}</span>
            <Link href={url!}><Globe className="h-5 w-5 text-muted-foreground" /></Link>
          </CardTitle>
          <CardDescription>Last edited 2 days ago</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={`/placeholder.svg?height=150&width=300&text=Website`}
            alt={`Website  preview`}
            className="w-full h-36 object-cover rounded-md mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span className="flex items-center">
              <Layout className="mr-1 h-4 w-4" /> {url}
            </span>
            <span className="flex items-center">
              <BarChart className="mr-1 h-4 w-4" /> 1.2k views
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
