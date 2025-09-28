import { NextResponse } from 'next/server'

export async function GET() {
  const apiKeys = process.env.LLM7_API_KEYS

  if (!apiKeys) {
    return NextResponse.json(
      { error: 'LLM7 API keys are not configured' },
      { status: 500 }
    )
  }

  try {
    const keys = apiKeys.split(',')
    const currentKey = keys[0] // Use first key for models endpoint

    const response = await fetch('https://api.llm7.io/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${currentKey}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`LLM7 API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching LLM7 models:', error)
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
