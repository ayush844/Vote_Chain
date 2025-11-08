export default function Features() {
  const features = [
    {
      icon: "🔐",
      title: "Cryptographically Secure",
      description:
        "Your votes are encrypted and secured with advanced cryptographic algorithms. No single entity can access or alter votes.",
    },
    {
      icon: "⛓️",
      title: "Immutable Records",
      description: "Every vote is recorded on the Ethereum blockchain. Once cast, votes cannot be changed or deleted.",
    },
    {
      icon: "👤",
      title: "Anonymous Voting",
      description:
        "Cast your vote anonymously while maintaining verifiability. Your identity is protected but your vote is transparent.",
    },
    {
      icon: "✓",
      title: "Instant Verification",
      description:
        "Verify votes in real-time on the blockchain. See results as they are tallied with zero trust required.",
    },
    {
      icon: "🌍",
      title: "Global Access",
      description:
        "Participate from anywhere in the world with an Ethereum wallet. No geographic limitations or barriers.",
    },
    {
      icon: "⚡",
      title: "Fast & Efficient",
      description:
        "Voting is processed on-chain with minimal latency. Results are finalized instantly on the blockchain.",
    },
  ]

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance mb-4 text-4xl font-bold sm:text-5xl">Why Choose VoteChain?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on blockchain technology to ensure voting integrity and transparency
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group rounded-lg border border-border bg-card p-6 hover:border-cyan-400/50 hover:bg-card/50 transition"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
