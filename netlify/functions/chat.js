export async function handler(event){

  const apiKey = process.env.GROQ_API_KEY

  const {messages} = JSON.parse(event.body)

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${apiKey}`
    },
    body:JSON.stringify({
      model:"llama-3.3-70b-versatile",
      messages:messages,
      temperature:0.7
    })
  })

  const data = await res.json()

  return{
    statusCode:200,
    body:JSON.stringify(data)
  }
}