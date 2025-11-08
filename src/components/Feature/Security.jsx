export default function Security() {
  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-balance mb-6 text-4xl font-bold sm:text-5xl">Enterprise-Grade Security</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              VoteChain implements industry-leading security practices to protect the integrity of every election.
            </p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <div>
                  <h4 className="font-semibold">Smart Contract Audited</h4>
                  <p className="text-sm text-muted-foreground">Third-party security audits ensure code reliability</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <div>
                  <h4 className="font-semibold">Multi-Signature Verification</h4>
                  <p className="text-sm text-muted-foreground">Critical operations require multiple approvals</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <div>
                  <h4 className="font-semibold">Zero-Knowledge Proofs</h4>
                  <p className="text-sm text-muted-foreground">Verify votes without revealing individual choices</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <div>
                  <h4 className="font-semibold">Decentralized Nodes</h4>
                  <p className="text-sm text-muted-foreground">Distributed across Ethereum validators globally</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-2xl" />
            <div className="relative rounded-lg border border-cyan-400/30 bg-card p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  <span className="text-sm">Smart Contract: 0x1234...5678</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Total Votes: 1,234,567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-sm">Block Confirmations: 1,000+</span>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="text-xs text-muted-foreground">All data verified on-chain in real-time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
