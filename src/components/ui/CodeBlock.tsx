'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

interface CodeBlockProps {
  children: string
  className?: string
  language?: string
}

const CodeBlock = ({ children, className, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  // Extract language from className if not provided
  const detectedLanguage = language || className?.replace('language-', '') || 'text'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  return (
    <div className="relative group my-4">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border border-white/10 rounded-t-lg">
        <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
          {detectedLanguage}
        </span>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Icon type="check" size="xs" className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Icon type="download" size="xs" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      
      {/* Code content */}
      <div className="relative">
        <SyntaxHighlighter
          language={detectedLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
            borderRadius: '0 0 0.5rem 0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
          }}
          showLineNumbers={true}
          wrapLines={true}
          wrapLongLines={true}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
