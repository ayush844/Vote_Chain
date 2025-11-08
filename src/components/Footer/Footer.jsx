export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
<div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600" />
      <span className="font-bold">VoteChain</span>
    </div>
    <p className="text-sm text-muted-foreground">
      Decentralized voting on Ethereum
    </p>
  </div>

  <div className="flex flex-col items-center justify-center lg:col-span-2">
    {/* <h3 className="font-mono text-lg tracking-wide text-blue-500">
        Engineered by <span className="text-white text-xl font-semibold">Ayush Sharma</span>
    </h3> */}

    <h3 className="font-semibold text-lg bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  Engineered by <span className="text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">Ayush Sharma</span>
</h3>

  </div>
</div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 VoteChain. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="https://x.com/ayushuprush" className="hover:text-foreground transition">
              Twitter
            </a>
            <a href="https://github.com/ayush844" className="hover:text-foreground transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
