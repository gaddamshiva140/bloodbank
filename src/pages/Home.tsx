import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Bell, Info } from "lucide-react";
import { DonorRegistrationForm } from "@/components/DonorRegistrationForm";
import { BloodRequestForm } from "@/components/BloodRequestForm";
import { DonationAnalytics } from "@/components/DonationAnalytics";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50/90">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/5e30bd82-ebc5-4780-b3f7-15a6a1936240.png" 
                alt="NCC Logo" 
                className="h-10 w-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">NCC Blood Donation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/precautions">
                <Button variant="ghost" size="icon" className="text-primary">
                  <Info className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <UserPlus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search donors by location or blood group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <Tabs defaultValue="donate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="donate">I Want to Donate</TabsTrigger>
              <TabsTrigger value="request">Request Blood</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="donate" className="mt-6">
              <DonorRegistrationForm />
            </TabsContent>
            <TabsContent value="request" className="mt-6">
              <BloodRequestForm />
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
              <DonationAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Home;