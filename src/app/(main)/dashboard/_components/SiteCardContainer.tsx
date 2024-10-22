"use client";
import { useEffect, useState } from "react";
import SiteCard from "./SiteCard";

export default function SiteCardContainer() {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/site");
        const { data } = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching sites:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p className="text-black">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-black">No sites found.</p>;
  }

  return (
    <>
      {data.map((site) => (
        <SiteCard key={site.id} {...site} />
      ))}
    </>
  );
}
