import { NextRequest, NextResponse } from 'next/server'

// Simple key rotation logic
let currentKeyIndex = 0

export async function POST(request: NextRequest) {
  const apiKeys = process.env.LLM7_API_KEYS

  if (!apiKeys) {
    return NextResponse.json(
      { error: 'LLM7 API keys are not configured' },
      { status: 500 }
    )
  }

  try {
    const keys = apiKeys.split(',')
    const currentKey = keys[currentKeyIndex]
    
    const body = await request.json()
    
    const response = await fetch('https://api.llm7.io/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      // Rotate to next key on failure
      currentKeyIndex = (currentKeyIndex + 1) % keys.length
      throw new Error(`LLM7 API error: ${response.statusText}`)
    }

    // For streaming responses, pass through the response
    if (body.stream) {
      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error with LLM7 chat:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
