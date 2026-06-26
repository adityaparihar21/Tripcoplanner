import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: string;
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'assistant', text: "I've organized the Tokyo itinerary. I noticed you prefer less walking. Should I swap the Ueno Park visit with a closer attraction to your hotel?" },
  { role: 'user', text: "Yes, please. What are the alternatives nearby?" },
  { role: 'assistant', text: "I can substitute it with the Nezu Museum. It's only 10 mins away by car and features a beautiful private garden. I'll update the itinerary and recalculate the budget." }
];

export default function CopilotPanel() {
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('tripco-copilot-messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('tripco-copilot-messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I've updated your itinerary based on your request. Let me know if you need anything else!" }]);
    }, 1000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'user', text: suggestion }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: "I've updated your itinerary based on your request. Let me know if you need anything else!" }]);
      }, 1000);
    }, 100);
  };

  const handleAction = (action: string) => {
    if (action === "Undo Itinerary Change") {
      setMessages(prev => prev.slice(0, prev.length - 2));
      toast.success("Itinerary change undone.");
      return;
    }
    toast.success(`Action Triggered: ${action}`, {
      description: "The AI agent is processing this request."
    });
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    toast.success("Chat context reset.");
  };

  return (
    <div className="w-80 bg-tertiary border-l border-neutral h-screen sticky top-0 flex flex-col hidden xl:flex">
      <div className="p-6 border-b border-neutral flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-medium">AI Copilot</h2>
        </div>
        <button 
          onClick={clearChat}
          className="text-xs text-secondary/50 hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-neutral text-secondary rounded-tr-sm' 
                : 'bg-primary/10 text-secondary border border-primary/20 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
            {msg.role === 'assistant' && i === 2 && msg.text === INITIAL_MESSAGES[2].text && (
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={() => handleAction("Undo Itinerary Change")}
                  className="text-xs bg-neutral px-3 py-1.5 rounded-full border border-neutral-light hover:border-primary/50 transition-colors"
                >
                  Undo Change
                </button>
                <button 
                  onClick={() => handleAction("View Nezu Museum on Map")}
                  className="text-xs bg-neutral px-3 py-1.5 rounded-full border border-neutral-light hover:border-primary/50 transition-colors"
                >
                  View Map
                </button>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-tertiary border-t border-neutral">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1">
          <button 
            onClick={() => handleSuggestion("Can you reduce the budget by $200?")}
            className="whitespace-nowrap text-xs bg-neutral px-3 py-1.5 rounded-full text-secondary/70 hover:text-secondary hover:bg-neutral-light transition-colors"
          >
            Reduce budget
          </button>
          <button 
            onClick={() => handleSuggestion("Add some nightlife options")}
            className="whitespace-nowrap text-xs bg-neutral px-3 py-1.5 rounded-full text-secondary/70 hover:text-secondary hover:bg-neutral-light transition-colors"
          >
            Add nightlife
          </button>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask Copilot to change anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-neutral border border-neutral-light rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-secondary/30"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
