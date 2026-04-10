import React from 'react';
import Image from 'next/image';
import { Send, CheckCircle2 } from 'lucide-react';
import { DashboardStats } from '@/src/types';

interface AiAssistantProps {
  stats?: DashboardStats;
}

export function AiAssistant({ stats }: AiAssistantProps) {
  return (
    <div className="bg-gradient-to-br from-[#e8f8f0] via-[#d4f0e2] to-[#c0e8d4] p-6 rounded-2xl border border-border-light shadow-sm relative overflow-hidden flex flex-col gap-4">
      <div className="absolute -right-4 -bottom-4 w-28 h-28 opacity-20 animate-bob">
        <Image src="/images/robot-happy.jpeg" alt="" width={112} height={112} className="w-full h-full object-cover rounded-xl" />
      </div>
      <p className="text-sm text-text-dark leading-relaxed">
        <strong>Hello!</strong> I'm your AI Growth Assistant.<br />Ready to boost your sales today?
      </p>
      <div className="flex gap-2 bg-white/70 backdrop-blur p-2 rounded-xl border border-border-light">
        <input type="text" placeholder="Type your request…" className="flex-1 bg-transparent border-none outline-none text-sm px-2" />
        <button className="bg-g-dark text-white p-2 rounded-lg hover:bg-g-mid transition-all"><Send className="w-4 h-4" /></button>
      </div>
      <div className="flex flex-wrap gap-2">
        {stats?.aiSuggestions.map(a => (
          <button key={a} className="px-3 py-1.5 bg-white/60 border border-g-dark/10 rounded-full text-[10px] font-bold text-g-dark hover:bg-white transition-all">{a}</button>
        ))}
      </div>
      <div className="space-y-1 mt-2">
        {['No contracts', 'Cancel anytime', 'Works with Deliveroo, Uber Eats & Just Eat'].map(f => (
          <div key={f} className="flex items-center gap-2 text-[10px] text-text-mid font-medium">
            <CheckCircle2 className="w-3 h-3 text-g-dark" /> {f}
          </div>
        ))}
      </div>
    </div>
  );
}
