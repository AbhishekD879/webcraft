'use client'
import { useEffect, useState } from "react";
import SiteCard from "./SiteCard";

export default function SiteCardContainer() {
  const [data, setData] = useState([]); // Initialize state to hold site data

  useEffect(() => {
    const fetchData = async () => { // Create an async function to fetch data
      const res = await fetch('/api/site');
      const {data} = await res.json();
      console.log(data);  // Log the fetched data to the console for debugging purposes.
      setData(data); // Update state with fetched data
    };
    fetchData(); // Call the async function
  }, []); // Empty dependency array to run once on mount
  if(!data){
    return <p className="text-black">Loading...</p>; // Show a loading message while data is being fetched.
  }
  return <>
    {data.map((site) => (
       // @ts-ignore 
      <SiteCard key={site.id} {...site} />
    ))}
  </>;
}
