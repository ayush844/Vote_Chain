"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600" />
          <span className="font-bold text-lg">VoteChain</span>
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
            How It Works
          </Link>
          <Link href="#security" className="text-sm text-muted-foreground hover:text-foreground transition">
            Security
          </Link>
        </div>

        <button className="hidden md:inline-flex px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition text-sm font-medium">
          Connect Wallet
        </button>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="flex flex-col gap-4 p-4">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="#security" className="text-sm text-muted-foreground hover:text-foreground">
              Security
            </Link>
            <button className="w-full px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition text-sm font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
