import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Muhammad Samad Ansari's AI assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: messages,
          userInput: currentInput,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.error || "I'm having trouble connecting to my brain right now. Please try again later!" 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my brain right now. Please try again later!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${isOpen ? 'bg-[#2FB7A3] rotate-90' : 'bg-[#6BCF9B] hover:scale-110 shadow-[#6BCF9B]/30'}`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] max-h-[550px] h-[70vh] bg-[#1F7A5A]/95 border border-white/10 rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500 backdrop-blur-2xl">
          <div className="p-6 bg-[#6BCF9B] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest leading-tight">Muhammad Samad Ansari<br/>AI Assistant</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></span>
                <span className="text-[8px] text-white/80 font-black uppercase tracking-widest">Powered by Gemini</span>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-white/5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-sm font-bold ${m.role === 'user' ? 'bg-[#6BCF9B] text-white rounded-br-none' : 'bg-white/10 text-[#F9FAF7] border border-white/10 rounded-bl-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 px-5 py-3.5 rounded-3xl rounded-bl-none flex gap-1.5 items-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#6BCF9B] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#6BCF9B] rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-[#6BCF9B] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3 backdrop-blur-md">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/10 border-white/10 border rounded-2xl px-5 py-3 text-sm text-[#F9FAF7] focus:ring-2 focus:ring-[#6BCF9B]/20 transition-all outline-none font-bold placeholder:text-white/20"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="w-12 h-12 bg-[#6BCF9B] rounded-2xl flex items-center justify-center text-white hover:bg-[#2FB7A3] disabled:opacity-50 transition-all shadow-lg shadow-[#6BCF9B]/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;