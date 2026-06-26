import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: string;
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'assistant', text: "Hi! I'm your AI Travel Copilot. How can I help you adjust your itinerary today?" }
];

export default function CopilotPanel() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
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

  const processChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Get current trip from local storage
      const tripsData = localStorage.getItem('tripco-trips');
      let currentTrip = null;
      if (tripsData) {
        const trips = JSON.parse(tripsData);
        if (trips && trips.length > 0) {
          currentTrip = trips[0]; // Assuming working on the most recent trip
        }
      }

      const response = await fetch('/api/copilot-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newMessages,
          currentTrip
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "I've processed your request." }]);

      if (data.updatedTrip && currentTrip) {
        // If the AI updated the trip, save it back
        const tripsData = localStorage.getItem('tripco-trips');
        if (tripsData) {
          const trips = JSON.parse(tripsData);
          const updatedTrips = trips.map((t: any) => t.id === data.updatedTrip.id ? data.updatedTrip : t);
          // If the AI didn't pass back an ID or it didn't match, we fallback to updating the first one
          if (!updatedTrips.some((t: any) => t.id === data.updatedTrip.id)) {
             updatedTrips[0] = data.updatedTrip;
          }
          localStorage.setItem('tripco-trips', JSON.stringify(updatedTrips));
          window.dispatchEvent(new Event('storage')); // Trigger update across tabs/components
          toast.success("Itinerary updated!");
        }
      }

    } catch (error) {
      console.error(error);
      toast.error('Copilot encountered an error.');
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I couldn't process that right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput('');
    processChat(msg);
  };

  const handleSuggestion = (suggestion: string) => {
    if (isLoading) return;
    processChat(suggestion);
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
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="bg-primary/10 text-primary border border-primary/20 rounded-2xl rounded-tl-sm p-4 text-sm flex items-center space-x-2">
               <Loader2 className="w-4 h-4 animate-spin" />
               <span>Thinking...</span>
             </div>
          </motion.div>
        )}
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
            disabled={isLoading}
            className="w-full bg-neutral border border-neutral-light rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-secondary/30 disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
