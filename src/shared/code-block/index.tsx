import { useEffect, useId, useState } from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import css from "highlight.js/lib/languages/css"
import scss from "highlight.js/lib/languages/scss"
import xml from "highlight.js/lib/languages/xml"
import "./styles.css"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("css", css)
hljs.registerLanguage("scss", scss)
hljs.registerLanguage("xml", xml)

export type CodeBlockLanguage = "javascript" | "css" | "scss" | "xml"

interface CodeBlockProps {
    children: string
    language: CodeBlockLanguage
}

function CodeBlock({ children, language }: CodeBlockProps) {
    const codeId = useId()
    const [html, setHtml] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        try {
            setHtml(hljs.highlight(children, { language }).value)
        } catch {
            setHtml(null)
        }
    }, [children, language])

    useEffect(() => {
        if (!copied) return
        const timer = window.setTimeout(() => setCopied(false), 2000)
        return () => window.clearTimeout(timer)
    }, [copied])

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(children)
            setCopied(true)
        } catch {
            setCopied(false)
        }
    }

    return (
        <div className="code-block">
            <div className="code-block__toolbar">
                <button
                    type="button"
                    className="code-block__copy"
                    onClick={handleCopy}
                    aria-label={copied ? "Copied" : "Copy code"}
                    aria-describedby={codeId}
                >
                    <svg
                        className="code-block__copy-icon"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                    >
                        {copied ? (
                            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                        ) : (
                            <path d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 0h4v1H6V2Zm5 3H5v7h6V5Z" />
                        )}
                    </svg>
                    <span>{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
            <pre className="code-block__pre">
                {html === null ? (
                    <code
                        id={codeId}
                        className={`code-block__code language-${language}`}
                    >
                        {children}
                    </code>
                ) : (
                    <code
                        id={codeId}
                        className={`code-block__code hljs language-${language}`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </pre>
        </div>
    )
}

export default CodeBlock
