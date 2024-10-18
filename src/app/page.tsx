import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layout, Code, Palette, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Craft Your Perfect Website
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build stunning, responsive websites with ease using WebCraft's
            intuitive drag-and-drop builder.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Layout,
                title: "Drag-and-Drop Builder",
                description:
                  "Easily create your website with our intuitive drag-and-drop interface.",
              },
              {
                icon: Code,
                title: "Custom Code Integration",
                description:
                  "Add your own custom HTML, CSS, and JavaScript for advanced customization.",
              },
              {
                icon: Palette,
                title: "Customizable Themes",
                description:
                  "Choose from a variety of themes or create your own unique design.",
              },
              {
                icon: Zap,
                title: "Fast and Responsive",
                description:
                  "Build websites that load quickly and look great on all devices.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Join Thousands of Happy Users
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start building your dream website today with WebCraft
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button>Sign Up Free</Button>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <div className="flex justify-center items-center space-x-8 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`/placeholder.svg?height=50&width=120&text=Logo+${i}`}
                alt={`Company logo ${i}`}
                className="h-12 w-auto grayscale opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 WebCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
