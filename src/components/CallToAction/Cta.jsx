export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-lg border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 p-12 text-center overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-balance mb-4 text-4xl font-bold sm:text-5xl">Ready to Vote?</h2>
            <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of voters participating in transparent, blockchain-based governance
            </p>
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition font-medium text-base">
              Connect Wallet & Start Voting
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
