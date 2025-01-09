import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Utensils, Droplet, Coffee, Wine, Battery, Sun, UserPlus, ThumbsUp, Plus } from "lucide-react";

const Precautions = () => {
  const motivationalPoints = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Save Lives",
      description: "One donation can save up to 3 lives! Your single act of kindness can make a huge difference."
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-blue-500" />,
      title: "Health Benefits",
      description: "Regular blood donation can reduce the risk of heart disease and help in maintaining good cardiovascular health."
    },
    {
      icon: <Plus className="w-6 h-6 text-green-500" />,
      title: "Quick Recovery",
      description: "Your body replenishes the blood volume within 24 hours, and all red blood cells within a few weeks."
    },
    {
      icon: <UserPlus className="w-6 h-6 text-purple-500" />,
      title: "Be a Hero",
      description: "Join our community of lifesavers. Every 2 seconds, someone needs blood - you can be their hero."
    }
  ];

  const precautions = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Before Donation",
      points: [
        "Get adequate sleep (at least 6 hours)",
        "Eat a healthy meal 2-3 hours before donation",
        "Drink plenty of water",
        "Avoid smoking for at least 2 hours before donation",
        "Wear comfortable clothing"
      ]
    },
    {
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
      title: "After Donation",
      points: [
        "Rest for 10-15 minutes immediately after donation",
        "Apply pressure to the donation site",
        "Keep the bandage on for several hours",
        "Avoid heavy lifting for 24 hours",
        "Don't remove the bandage for at least 4 hours"
      ]
    }
  ];

  const regenerationTips = [
    {
      icon: <Utensils className="w-6 h-6 text-green-500" />,
      title: "Nutrition",
      description: "Eat iron-rich foods like spinach, red meat, and beans. Include vitamin C rich foods to enhance iron absorption."
    },
    {
      icon: <Coffee className="w-6 h-6 text-brown-500" />,
      title: "Hydration",
      description: "Drink extra fluids for the next 48 hours. Water, juices, and healthy beverages are recommended."
    },
    {
      icon: <Battery className="w-6 h-6 text-yellow-500" />,
      title: "Rest",
      description: "Get adequate rest and sleep. Your body needs time to regenerate blood cells."
    },
    {
      icon: <Wine className="w-6 h-6 text-purple-500" />,
      title: "Avoid",
      description: "Stay away from alcohol and smoking for at least 24 hours after donation."
    },
    {
      icon: <Sun className="w-6 h-6 text-orange-500" />,
      title: "Exercise",
      description: "Avoid strenuous physical activity for 24 hours after donation."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Why Donate Blood?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every drop counts! Your blood donation can be the gift of life for someone in need.
            Join us in this noble cause and become a lifesaver today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {motivationalPoints.map((point, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {point.icon}
                  {point.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mt-12">Blood Donation Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {precautions.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mt-12">Blood Regeneration Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {regenerationTips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {tip.icon}
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Precautions;