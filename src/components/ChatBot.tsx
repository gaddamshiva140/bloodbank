import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm here to help you with any questions about blood donation. What would you like to know?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot response based on keywords
    const response = generateResponse(input.toLowerCase());
    
    // Simulate API delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    if (input.includes("eligible") || input.includes("who can donate")) {
      return "Generally, you can donate blood if you: \n- Are at least 18 years old\n- Weigh at least 50kg\n- Are in good health\n- Haven't donated blood in the last 3 months";
    }
    if (input.includes("how often") || input.includes("frequency")) {
      return "You can donate whole blood every 12 weeks (3 months). This allows your body enough time to replenish the donated blood cells.";
    }
    if (input.includes("process") || input.includes("what happens")) {
      return "The blood donation process takes about 30-45 minutes total:\n1. Registration\n2. Medical history review\n3. Quick physical examination\n4. The actual donation takes only 8-10 minutes\n5. Short rest and refreshments";
    }
    if (input.includes("prepare") || input.includes("before donation")) {
      return "To prepare for blood donation:\n- Get enough sleep\n- Eat a healthy meal\n- Drink plenty of fluids\n- Bring ID and list of medications\n- Wear comfortable clothing";
    }
    if (input.includes("after") || input.includes("recovery")) {
      return "After donating:\n- Rest for 15 minutes\n- Drink extra fluids\n- Avoid heavy lifting for 24 hours\n- Keep the bandage on for several hours\n- Eat well and resume normal activities gradually";
    }
    return "I'm here to help with blood donation questions. You can ask about eligibility, the donation process, preparation, recovery, or frequency of donation. What would you like to know?";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[440px]">
        <SheetHeader>
          <SheetTitle>Blood Donation Assistant</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 mt-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                    Typing...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex items-center gap-2 pt-4">
            <Input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;