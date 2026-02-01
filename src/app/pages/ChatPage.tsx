import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  Circle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";

interface Message {
  id: number;
  sender: "user" | "agency";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agency",
      text: "Hello Alex! Thank you for choosing Global Visa Services. I'm Sarah, your dedicated visa consultant. How can I help you today?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Hi Sarah! I uploaded all my documents yesterday. When can I expect the review to be completed?",
      time: "10:35 AM",
      status: "read",
    },
    {
      id: 3,
      sender: "agency",
      text: "Great question! I can see all your documents have been received. Our team is currently reviewing your financial documents. This typically takes 2-3 business days.",
      time: "10:37 AM",
    },
    {
      id: 4,
      sender: "user",
      text: "That's good to know. Is there anything else I need to prepare?",
      time: "10:40 AM",
      status: "read",
    },
    {
      id: 5,
      sender: "agency",
      text: "Everything looks good so far! Once we complete the review, we'll send you the payment link. After payment confirmation, we'll submit your application to the UK visa office within 24 hours.",
      time: "10:42 AM",
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString("en-US", { 
          hour: "numeric", 
          minute: "2-digit",
          hour12: true 
        }),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Visa Agency Marketplace</span>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-6 py-8 max-w-5xl flex flex-col">
        <Card className="border-0 shadow-lg bg-white flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    GV
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Global Visa Services Ltd.</h2>
                  <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[70%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "agency" && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                        GV
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div className={`flex items-center gap-2 mt-1 px-2 ${msg.sender === "user" ? "justify-end" : ""}`}>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      {msg.sender === "user" && msg.status && (
                        <span className="text-xs text-gray-500">
                          {msg.status === "read" && "✓✓"}
                          {msg.status === "delivered" && "✓✓"}
                          {msg.status === "sent" && "✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 h-12"
              />
              <Button 
                onClick={handleSend}
                disabled={!message.trim()}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 px-12">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
