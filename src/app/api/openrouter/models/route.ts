import { NextResponse } from 'next/server'
import { ALL_OPENROUTER_MODELS } from '@/api/openrouter-comprehensive-models'

export async function GET() {
  // Return our comprehensive models list instead of fetching from API
  // This ensures we have all models with proper pricing and free/paid indicators
  try {
    return NextResponse.json({
      data: ALL_OPENROUTER_MODELS
    })
  } catch (error) {
    console.error('Error returning OpenRouter models:', error)
    return NextResponse.json(
      { error: 'Failed to return models' },
      { status: 500 }
    )
  }
}
