import { useState, useRef, useEffect, useCallback } from "react"
import { buildSystemPrompt } from "@lib/chatbotContext"
import { SITE } from "@lib/constants"

const PRESET_QUESTIONS = [
  "What's his tech stack?",
  "Is he open to remote?",
  "What has he built at LTIMindtree?",
  "Does he know system design?",
  "What's his notice period?",
  "Tell me about his AI/ML background",
]

const SYSTEM_PROMPT = buildSystemPrompt()

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M12 11V7"/>
    <circle cx="12" cy="5" r="2"/>
  </svg>
)

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export function AskAV() {

  const [open,setOpen] = useState(false)
  const [messages,setMessages] = useState([
    {
      role:"bot",
      text:`Hi! 👋 I'm AV Assistant — I know everything about ${SITE.name}.\n\nAsk me anything!`
    }
  ])

  const [input,setInput] = useState("")
  const [loading,setLoading] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  useEffect(()=>{
    if(open){
      setTimeout(()=>inputRef.current?.focus(),300)
    }
  },[open])

  const buildHistory = (msgs)=>{
    return msgs
      .filter(m=>m.role!=="bot" || msgs.indexOf(m)>0)
      .map(m=>({
        role: m.role==="bot" ? "assistant":"user",
        content: m.text
      }))
  }

  const sendMessage = useCallback(async(text)=>{

    if(!text.trim() || loading) return

    const userMsg = {role:"user",text:text.trim()}

    setMessages(prev=>[...prev,userMsg])
    setInput("")
    setLoading(true)

    setMessages(prev=>[...prev,{role:"bot",text:""}])

    try{

      const chatHistory = buildHistory(messages)

      const res = await fetch("/.netlify/functions/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          messages:[
            {role:"system",content:SYSTEM_PROMPT},
            ...chatHistory,
            {role:"user",content:text.trim()}
          ]
        })
      })

      const data = await res.json()

      const reply = data?.choices?.[0]?.message?.content || "No response"

      setMessages(prev=>{
        const updated=[...prev]
        updated[updated.length-1]={role:"bot",text:reply}
        return updated
      })

    }catch(err){

      console.error(err)

      setMessages(prev=>{
        const updated=[...prev]
        updated[updated.length-1]={
          role:"bot",
          text:"Something went wrong contacting the AI service."
        }
        return updated
      })

    }finally{
      setLoading(false)
    }

  },[loading,messages])

  const handleKey=(e)=>{
    if(e.key==="Enter" && !e.shiftKey){
      e.preventDefault()
      sendMessage(input)
    }
  }

  return(
    <>
      <button
        className={`askav-trigger ${open?"open":""}`}
        onClick={()=>setOpen(p=>!p)}
      >
        {open?<CloseIcon/>:<BotIcon/>}
        {!open && <span className="askav-trigger-label">Ask AV</span>}
      </button>

      <div className={`askav-window ${open?"open":""}`}>

        <div className="askav-messages">

          {messages.map((msg,i)=>(
            <div key={i} className={`askav-msg ${msg.role}`}>

              <div className="askav-msg-avatar">
                {msg.role==="bot"?<BotIcon/>:<UserIcon/>}
              </div>

              <div className="askav-msg-bubble">

                {msg.text.split("\n").map((line,j)=>(
                  <span key={j}>
                    {line}
                    {j<msg.text.split("\n").length-1 && <br/>}
                  </span>
                ))}

              </div>

            </div>
          ))}

          <div ref={bottomRef}/>

        </div>

        <div className="askav-input-row">

          <textarea
            ref={inputRef}
            className="askav-input"
            placeholder="Ask about skills, projects, availability..."
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />

          <button
            className="askav-send"
            onClick={()=>sendMessage(input)}
            disabled={!input.trim() || loading}
          >
            <SendIcon/>
          </button>

        </div>

      </div>
    </>
  )
}