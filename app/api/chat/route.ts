import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
      return Response.json({ message: "Please send a message!" })
    }

    const systemPrompt = `You are a cute and friendly shopping assistant for ShopHub e-commerce store. You help customers find products, answer questions about orders, and provide shopping recommendations. 
  
Be warm, helpful, and use friendly language. Keep responses concise and helpful. You can help with:
- Product recommendations
- Order tracking
- Shipping information
- Returns and refunds
- General shopping questions

Always be positive and encouraging!`

    const lastMessage = messages[messages.length - 1]?.content || ""

    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      system: systemPrompt,
      prompt: lastMessage,
      maxTokens: 500,
      temperature: 0.7,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      { message: "Sorry, I'm having trouble responding right now. Please try again!" },
      { status: 500 },
    )
  }
}
