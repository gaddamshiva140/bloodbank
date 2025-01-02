import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Droplets, UserPlus, Bell } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">NCC Blood Donation</h1>
            <div className="flex items-center space-x-4">
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donate">I Want to Donate</TabsTrigger>
              <TabsTrigger value="request">Request Blood</TabsTrigger>
            </TabsList>
            <TabsContent value="donate" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Register as a Donor</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Age" type="number" />
                    <Input placeholder="Blood Group" />
                    <Input placeholder="Phone Number" type="tel" />
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Location" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Droplets className="h-4 w-4 mr-2" />
                    Register as Donor
                  </Button>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="request" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Request Blood</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Patient Name" />
                    <Input placeholder="Required Blood Group" />
                    <Input placeholder="Hospital Name" />
                    <Input placeholder="Location" />
                    <Input placeholder="Contact Number" type="tel" />
                    <Input placeholder="Required Units" type="number" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Submit Request
                  </Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Home;