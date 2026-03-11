import { useState, useRef, useEffect, useCallback } from 'react'
import Groq from 'groq-sdk'
import { buildSystemPrompt } from '@lib/chatbotContext'
import { SITE } from '@lib/constants'

// Initialize Groq client
// Note: dangerouslyAllowBrowser is required for frontend-only apps like Vite. 
// Since Groq is free, the risk of someone "stealing" your key is just them using your free quota.
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE',
  dangerouslyAllowBrowser: true 
})

console.log('🔑 GROQ_API_KEY loaded:', import.meta.env.VITE_GROQ_API_KEY ? '✅ Yes' : '❌ No')
console.log('🤖 Model: llama-3.3-70b-versatile')

const PRESET_QUESTIONS = [
  "What's his tech stack?",
  'Is he open to remote?',
  'What has he built at LTIMindtree?',
  'Does he know system design?',
  "What's his notice period?",
  'Tell me about his AI/ML background',
]

const SYSTEM_PROMPT = buildSystemPrompt()

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M12 11V7"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M8 15h.01M16 15h.01"/>
  </svg>
)

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

/**
 * AskAV
 * Floating AI chatbot powered by Groq & Llama 3 (Free Tier).
 */
export function AskAV() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi! 👋 I'm AV Assistant — I know everything about ${SITE.name}.\n\nAsk me anything, or pick a question below!`,
    },
  ])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)
  const abortRef   = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  // Map messages to Groq's expected format
  const buildHistory = useCallback((msgs) => {
    return msgs
      .filter((m) => m.role !== 'bot' || msgs.indexOf(m) > 0) // Skip welcome message
      .map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }))
  }, [])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || loading) return

    const userMsg = { role: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Placeholder bot message to stream into
    setMessages((prev) => [...prev, { role: 'bot', text: '' }])

    try {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      const chatHistory = buildHistory(messages)
      
      // We prepend the System Prompt to the array of messages
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory,
        { role: 'user', content: text.trim() }
      ]

      const stream = await groq.chat.completions.create({
        messages: apiMessages,
        model: "llama-3.3-70b-versatile", // Super smart, incredibly fast model
        temperature: 0.7,
        max_completion_tokens: 1000,
        stream: true,
      })

      // Stream the response directly to the UI
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ""
        if (content) {
          setMessages((prev) => {
            const updated = [...prev]
            const lastIndex = updated.length - 1
            updated[lastIndex] = {
              ...updated[lastIndex],
              text: updated[lastIndex].text + content,
            }
            return updated
          })
        }
      }

    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('💥 Error sending message:', err.message)
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'bot',
          text: `Oops — something went wrong. Make sure your VITE_GROQ_API_KEY is in your .env file!`,
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }, [loading, messages, buildHistory])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleClose = () => {
    setOpen(false)
    abortRef.current?.abort()
  }

  return (
    <>
      <button
        className={`askav-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen((p) => !p)}
        aria-label="Chat with AV Assistant"
      >
        {open ? <CloseIcon /> : <BotIcon />}
        {!open && <span className="askav-trigger-label">Ask AV</span>}
        {!open && <span className="askav-trigger-dot" aria-hidden="true" />}
      </button>

      <div className={`askav-window ${open ? 'open' : ''}`} role="dialog" aria-label="AV Assistant chat">
        <div className="askav-header">
          <div className="askav-header-left">
            <div className="askav-avatar">
              <BotIcon />
              <span className="askav-online" aria-hidden="true" />
            </div>
            <div>
              <div className="askav-name">AV Assistant</div>
              <div className="askav-status">Powered by Llama 3 · Free</div>
            </div>
          </div>
          <button className="askav-close" onClick={handleClose} aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>

        <div className="askav-messages" role="log" aria-live="polite" onWheel={(e) => e.stopPropagation()}>
          {messages.map((msg, i) => (
            <div key={i} className={`askav-msg ${msg.role}`}>
              <div className="askav-msg-avatar" aria-hidden="true">
                {msg.role === 'bot' ? <BotIcon /> : <UserIcon />}
              </div>
              <div className="askav-msg-bubble">
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
                {msg.role === 'bot' && i === messages.length - 1 && loading && (
                  <span className="askav-stream-cursor" aria-hidden="true" />
                )}
              </div>
            </div>
          ))}

          {loading && messages[messages.length - 1]?.text === '' && (
            <div className="askav-thinking" aria-label="Thinking">
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 2 && !loading && (
          <div className="askav-presets" role="list">
            {PRESET_QUESTIONS.map((q) => (
              <button key={q} className="askav-chip" onClick={() => sendMessage(q)} role="listitem">
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="askav-input-row">
          <textarea
            ref={inputRef}
            className="askav-input"
            placeholder="Ask about skills, projects, availability..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            aria-label="Type your message"
            disabled={loading}
          />
          <button
            className={`askav-send ${input.trim() && !loading ? 'active' : ''}`}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>

        <div className="askav-footer">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </>
  )
}