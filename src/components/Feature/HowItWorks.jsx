export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Wallet",
      description: "Connect your Ethereum wallet and verify your eligibility to vote",
    },
    {
      number: "02",
      title: "Review Proposals",
      description: "Examine the proposals and view detailed information about each option",
    },
    {
      number: "03",
      title: "Cast Your Vote",
      description: "Submit your vote securely on the blockchain with a single transaction",
    },
    {
      number: "04",
      title: "Verify Results",
      description: "View transparent, real-time results verified directly from the blockchain",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance mb-4 text-4xl font-bold sm:text-5xl">How VoteChain Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple and transparent voting process in 4 steps
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="rounded-lg border border-border bg-background p-6">
                <div className="mb-4 text-4xl font-bold text-cyan-400">{step.number}</div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-cyan-400/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
