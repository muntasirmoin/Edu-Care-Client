"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // simulate sending delay
    setTimeout(() => {
      setLoading(false);
      toast.success("Message Sent! We’ll get back to you as soon as possible!");
    }, 1500);
  };

  return (
    <div className="bg-violet-50 dark:bg-violet-900 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title & Subtitle */}
        <TitleSubTitle
          title="Contact Us"
          subtitle="Have questions about courses? We’d love to hear from you!"
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
          {/* Contact Form */}
          <Card className="shadow-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-violet-700 dark:text-white">
                Send us a Message
              </CardTitle>
              <CardTitle className="text-2xl font-bold text-violet-700 dark:text-white">
                We’d love to hear from you!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  placeholder="Your Name"
                  className="dark:bg-gray-800 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-300 transition"
                  required
                />
                <Input
                  placeholder="Your Email"
                  type="email"
                  className="dark:bg-gray-800 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-300 transition"
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="dark:bg-gray-800 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-300 transition"
                  required
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 dark:bg-violet-400 dark:hover:bg-violet-500 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {[
              {
                icon: (
                  <Mail className="w-6 h-6 text-violet-600 dark:text-violet-300" />
                ),
                title: "",
                info: "info@educare.com",
              },
              {
                icon: (
                  <Phone className="w-6 h-6 text-violet-600 dark:text-violet-300" />
                ),
                title: "",
                info: "+880 1768968938",
              },
              {
                icon: (
                  <MapPin className="w-6 h-6 text-violet-600 dark:text-violet-300" />
                ),
                title: "",
                info: "Sylhet, Bangladesh",
              },
            ].map((contact, index) => (
              <Card
                key={index}
                className="flex items-center gap-4 p-5 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl hover:scale-105 transition-transform duration-300 bg-white dark:bg-violet-800"
              >
                {contact.icon}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {contact.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {contact.info}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
