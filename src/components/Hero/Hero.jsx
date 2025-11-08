"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyan-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span className="text-sm text-muted-foreground">Live on Ethereum Mainnet</span>
        </div>

        <h1 className="text-balance mb-6 text-5xl font-bold sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Decentralized Voting
          </span>
          <br />
          Powered by Ethereum
        </h1>

        <p className="text-balance mb-8 max-w-2xl mx-auto text-lg text-muted-foreground">
          Secure, transparent, and tamper-proof voting on the blockchain. Every vote is immutable, verifiable, and
          decentralized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition font-medium text-base">
            Start Voting
          </button>
          <Link
            href="#how-it-works"
            className="px-8 py-3 rounded-full border border-border hover:bg-muted transition font-medium text-base"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">100%</div>
            <p className="text-sm text-muted-foreground">Transparent</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">Immutable</div>
            <p className="text-sm text-muted-foreground">On-Chain</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">24/7</div>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
