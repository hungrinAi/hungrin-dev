'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Plus, 
  Image as ImageIcon, 
  Calendar, 
  Tag,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type?: 'text' | 'promo-card';
  data?: any;
}

export default function Promotions() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: "Hi! I'm your AI Growth Assistant. I can help you create high-converting promotions for your restaurant. What would you like to promote today?",
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That sounds like a great idea! Based on your sales data, a 'Burger Bundle' would perform exceptionally well on Tuesdays. Here's a draft promotion I've created for you:",
        type: 'promo-card',
        data: {
          title: 'Burger Bundle!',
          price: '£12.99',
          originalPrice: '£16.99',
          emoji: '🍔',
          slots: 7
        }
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <AppLayout 
      title="Promotions" 
      subtitle="Create and manage AI-powered promotions to drive more orders."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-g-pale rounded-xl flex items-center justify-center text-g-dark">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-dark">AI Growth Assistant</h3>
                <p className="text-[10px] text-g-dark font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-g-dark animate-pulse" /> Online
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Reset Chat</Button>
          </CardHeader>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-g-faint/30">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-4", m.role === 'user' ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                  m.role === 'assistant' ? "bg-g-dark text-white" : "bg-gray-200 text-gray-600"
                )}>
                  {m.role === 'assistant' ? '🤖' : 'U'}
                </div>
                <div className={cn("max-w-[80%] space-y-4", m.role === 'user' ? "text-right" : "")}>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm shadow-sm",
                    m.role === 'assistant' ? "bg-white text-text-dark border border-border-light" : "bg-g-dark text-white"
                  )}>
                    {m.content}
                  </div>
                  
                  {m.type === 'promo-card' && (
                    <div className="bg-white p-5 rounded-2xl border border-border-light shadow-md max-w-sm ml-0 mr-auto space-y-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-g-pale rounded-xl flex items-center justify-center text-3xl shrink-0">
                          {m.data.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-text-dark">{m.data.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-bold text-g-dark">{m.data.price}</span>
                            <span className="text-xs text-text-muted line-through">{m.data.originalPrice}</span>
                          </div>
                          <p className="text-[10px] text-text-muted mt-1">Only {m.data.slots} slots left today.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 py-2 text-xs">Launch Now</Button>
                        <Button variant="outline" className="flex-1 py-2 text-xs">Edit Draft</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border-light bg-white">
            <div className="flex gap-2 bg-g-faint p-2 rounded-xl border border-border-light">
              <input 
                type="text" 
                placeholder="Ask me to create a promo for slow Tuesdays…" 
                className="flex-1 bg-transparent border-none outline-none text-sm px-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-g-dark text-white p-2 rounded-lg hover:bg-g-mid transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {['Suggest A Promo', 'Current offers', 'Get More Customers', 'Create a Post'].map(a => (
                <button 
                  key={a}
                  onClick={() => setInput(a)}
                  className="px-3 py-1.5 bg-white border border-border-light rounded-full text-[10px] font-bold text-text-mid hover:bg-g-pale hover:text-g-dark transition-all whitespace-nowrap"
                >
                  + {a}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-g-dark to-g-mid text-white border-none">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> AI Tips
            </h3>
            <div className="space-y-4">
              {[
                { icon: Calendar, text: "Tuesdays are your slowest days. Launch a 'Mid-week Treat' promo." },
                { icon: Tag, text: "Your 'Burger Bundle' has a 45% conversion rate. Promote it more!" },
                { icon: CheckCircle2, text: "Adding a 'Limited Time' tag increases clicks by 22%." }
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <tip.icon className="w-5 h-5 shrink-0" />
                  <p className="text-xs leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-bold text-text-dark mb-4">Active Promotions</h3>
            <div className="space-y-4">
              {[
                { name: 'Lunch Special', status: 'Active', orders: 24 },
                { name: 'Weekend Feast', status: 'Paused', orders: 12 },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light">
                  <div>
                    <p className="text-sm font-bold text-text-dark">{p.name}</p>
                    <p className="text-[10px] text-text-muted">{p.orders} orders generated</p>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold",
                    p.status === 'Active' ? "bg-g-pale text-g-dark" : "bg-gray-100 text-gray-500"
                  )}>{p.status}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-xs">View All Campaigns <ArrowRight className="w-3 h-3 ml-2" /></Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
