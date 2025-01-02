import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Droplets, UserPlus, Bell, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              setLocation(data.results[0].formatted);
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            toast.error("Could not fetch location details");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location");
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  const validateDonorAge = (age: string) => {
    const numAge = parseInt(age);
    if (numAge < 18) {
      toast.error("You must be at least 18 years old to donate blood");
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50/90">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
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
                    <Input placeholder="Full Name" required />
                    <Input
                      placeholder="Age"
                      type="number"
                      min="18"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onBlur={() => validateDonorAge(age)}
                    />
                    <div className="relative">
                      <Select value={bloodGroup} onValueChange={setBloodGroup} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Input placeholder="Phone Number" type="tel" required />
                    <Input placeholder="Email" type="email" required />
                    <div className="relative">
                      <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={getCurrentLocation}
                        disabled={loading}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!validateDonorAge(age)) return;
                      // Handle form submission
                    }}
                  >
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
                    <Input placeholder="Patient Name" required />
                    <div className="relative">
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Required Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Input placeholder="Hospital Name" required />
                    <div className="relative">
                      <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={getCurrentLocation}
                        disabled={loading}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input placeholder="Contact Number" type="tel" required />
                    <Input placeholder="Required Units" type="number" required />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
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