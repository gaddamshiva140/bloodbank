import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Droplets, MapPin, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DonorRegistrationForm = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateDonorAge = (age: string) => {
    const numAge = parseInt(age);
    if (numAge < 18) {
      toast.error("You must be at least 18 years old to donate blood");
      return false;
    }
    return true;
  };

  const validateName = (name: string) => {
    if (/[^a-zA-Z\s]/.test(name)) {
      toast.error("Name should only contain letters and spaces");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (phone: string) => {
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }
    return true;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Register as a Donor</h2>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <AvatarImage src={profileImage || ""} />
            <AvatarFallback>
              <Upload className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const age = formData.get('age') as string;
        const phone = formData.get('phone') as string;

        if (!validateName(name) || !validateDonorAge(age) || !validatePhoneNumber(phone)) {
          return;
        }
        // Handle form submission
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            name="name" 
            placeholder="Full Name" 
            required 
            pattern="[A-Za-z\s]+"
            title="Name should only contain letters and spaces"
          />
          <Input
            name="age"
            placeholder="Age"
            type="number"
            min="18"
            required
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
          <Input 
            name="phone" 
            placeholder="Phone Number" 
            type="tel" 
            pattern="\d{10}" 
            title="Phone number must be exactly 10 digits"
            required 
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, '');
            }}
          />
          <Input name="email" placeholder="Email" type="email" required />
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
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          <Droplets className="h-4 w-4 mr-2" />
          Register as Donor
        </Button>
      </form>
    </Card>
  );
};