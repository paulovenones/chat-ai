"use client";

import { useChat } from "ai/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <Card className="h-full w-[440px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>
          Using Vercel SDK to create a chat bot.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto h-full">
        <ScrollArea className="overflow-auto max-h-full w-full space-y-4 pr-4">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className="flex gap-2 text-slate-600 text-sm mb-4"
              >
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>PV</AvatarFallback>
                    <AvatarImage src="https://github.com/paulovenones.png" />
                  </Avatar>
                )}

                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/11865/11865313.png" />
                  </Avatar>
                )}

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-800">
                    {message.role === "user" ? "User" : "AI"}:
                  </span>
                  {message.content}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
