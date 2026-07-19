import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ShieldCheck,
  Radar,
  Cpu,
  Network,
  Terminal,
  BookOpen,
  Zap,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  Fingerprint,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arc Network — ZK Privacy Infrastructure" },
      {
        name: "description",
        content:
          "Arc Network — a decentralized ZK-privacy layer for validating transactions, verifying wallet integrity, and building on cryptographically-secure infrastructure.",
      },
      { property: "og:title", content: "Arc Network — ZK Privacy Infrastructure" },
      {
        property: "og:description",
        content:
          "Arc Network — a decentralized ZK-privacy layer for validating transactions, verifying wallet integrity, and building on cryptographically-secure infrastructure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function randHex(len: number) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * 16)];
  return out;
}

function Index() {
  // Live metrics
  const [blocks, setBlocks] = useState(18_492_310);
  const [nodes] = useState(12_847);
  const [privacyScore] = useState(99.8);

  useEffect(() => {
    const id = setInterval(() => {
      setBlocks((b) => b + Math.floor(1 + Math.random() * 4));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[540px] w-[540px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.22), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(157,78,221,0.25), transparent 60%)" }}
      />

      <Nav />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 md:pt-16">
        <Hero />

        <section id="tracker" className="mt-16 md:mt-24">
          <SectionHeader
            eyebrow="01 / Live Telemetry"
            title="Ecosystem Live Tracker"
            subtitle="Real-time signal from the Arc validator mesh."
          />
          <LiveTracker blocks={blocks} nodes={nodes} privacyScore={privacyScore} />
        </section>

        <section id="validator" className="mt-20 md:mt-28">
          <SectionHeader
            eyebrow="02 / ZK-Privacy Validator"
            title="Verify a transaction or wallet"
            subtitle="Generates a zero-knowledge attestation of privacy state."
          />
          <PrivacyValidator />
        </section>

        <section id="sybil" className="mt-20 md:mt-28">
          <SectionHeader
            eyebrow="03 / Sybil Guard"
            title="Address integrity scanner"
            subtitle="Detects multi-account farming and bot fingerprints."
          />
          <SybilGuard />
        </section>

        <section id="developers" className="mt-20 md:mt-28">
          <SectionHeader
            eyebrow="04 / Developers"
            title="Ship on Arc"
            subtitle="Everything you need to plug into the network."
          />
          <DevGrid />
        </section>

        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6">
      <a href="#" className="flex items-center gap-2.5">
        <ArcMark />
        <span className="font-mono text-sm tracking-[0.28em] text-foreground">
          ARC<span className="text-[color:var(--color-neon)]">.</span>NETWORK
        </span>
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        {[
          ["Tracker", "#tracker"],
          ["Validator", "#validator"],
          ["Sybil Guard", "#sybil"],
          ["Developers", "#developers"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-[color:var(--color-neon)]"
          >
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#validator"
        className="group relative inline-flex items-center gap-2 rounded-md border border-[color:var(--color-neon)]/40 bg-[color:var(--color-neon)]/5 px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-neon)] transition-all hover:bg-[color:var(--color-neon)]/15 hover:shadow-glow-cyan"
      >
        Launch Console
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </header>
  );
}

function ArcMark() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center">
      <div className="absolute inset-0 rounded-md border border-[color:var(--color-neon)]/50" />
      <div className="absolute inset-1 rounded-sm border border-[color:var(--color-violet-glow)]/60" />
      <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon)] shadow-glow-cyan animate-pulse-ring" />
    </div>
  );
}

function Hero() {
  return (
    <div className="relative mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon)] animate-pulse-ring" />
          Mainnet · v4.2 · Uptime 100%
        </div>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
          The <span className="text-glow-cyan text-[color:var(--color-neon)]">zero-knowledge</span> layer for a{" "}
          <span className="text-glow-violet text-[color:var(--color-violet-glow)]">private</span> internet.
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Arc is a decentralized privacy fabric. Validate transactions, prove identity without revealing it, and defend
          your protocol against Sybil attacks — natively.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#validator"
            className="group relative inline-flex items-center gap-2 rounded-md bg-[color:var(--color-neon)] px-5 py-3 font-mono text-xs uppercase tracking-widest text-[color:var(--color-primary-foreground)] transition-all hover:shadow-glow-cyan"
          >
            <Zap className="h-4 w-4" />
            Run ZK Validation
          </a>
          <a
            href="#developers"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-[color:var(--color-violet-glow)]/60 hover:text-[color:var(--color-violet-glow)] hover:shadow-glow-violet"
          >
            <Terminal className="h-4 w-4" />
            Read the docs
          </a>
        </div>
      </div>
      <HeroPanel />
    </div>
  );
}

function HeroPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-neon)]/60 to-transparent" />
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        <span>~/arc/console</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon)] animate-pulse-ring" /> connected
        </span>
      </div>
      <div className="mt-5 space-y-2 font-mono text-[13px] leading-relaxed">
        <p className="text-muted-foreground">$ arc verify --proof zk-snark</p>
        <p className="text-[color:var(--color-neon)] text-glow-cyan">→ generating witness…</p>
        <p className="text-muted-foreground">$ arc broadcast --shielded</p>
        <p className="text-[color:var(--color-violet-glow)] text-glow-violet">✔ commitment anchored @ block #{(18_492_310).toLocaleString()}</p>
        <p className="text-muted-foreground">$ arc sybil-scan 0x9f…c1</p>
        <p className="text-[color:var(--color-neon)]">✔ organic fingerprint · trust 0.97</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "TPS", value: "42,180" },
          { label: "Proofs/s", value: "1,204" },
          { label: "Slashing", value: "0.00%" },
        ].map((m) => (
          <div key={m.label} className="rounded-md border border-border bg-background/40 p-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
            <div className="mt-1 font-mono text-lg text-foreground">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-neon)]">
        {eyebrow}
      </span>
      <h2 className="font-display text-2xl tracking-tight md:text-4xl">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function LiveTracker({ blocks, nodes, privacyScore }: { blocks: number; nodes: number; privacyScore: number }) {
  const cards = [
    {
      icon: <Activity className="h-4 w-4" />,
      label: "Total Blocks Validated",
      value: blocks.toLocaleString(),
      hint: "+3.2M / 24h",
      accent: "cyan" as const,
      live: true,
    },
    {
      icon: <Network className="h-4 w-4" />,
      label: "Active Decentralized Nodes",
      value: nodes.toLocaleString(),
      hint: "97 countries",
      accent: "violet" as const,
    },
    {
      icon: <Lock className="h-4 w-4" />,
      label: "Global Privacy Score",
      value: `${privacyScore.toFixed(1)}%`,
      hint: "ZK-SNARK verified",
      accent: "cyan" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-neon)]/40 hover:shadow-glow-cyan"
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span
                className={
                  c.accent === "cyan"
                    ? "text-[color:var(--color-neon)]"
                    : "text-[color:var(--color-violet-glow)]"
                }
              >
                {c.icon}
              </span>
              {c.label}
            </span>
            {c.live && (
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon)] animate-pulse-ring" />
                Live
              </span>
            )}
          </div>
          <div
            className={`mt-4 font-mono text-3xl tracking-tight md:text-4xl ${
              c.accent === "cyan"
                ? "text-[color:var(--color-neon)] text-glow-cyan"
                : "text-[color:var(--color-violet-glow)] text-glow-violet"
            }`}
          >
            {c.value}
          </div>
          <div className="mt-2 font-mono text-[11px] text-muted-foreground">{c.hint}</div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-neon)]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}

type ValidationResult = {
  key: string;
  shield: number;
  target: string;
  timestamp: string;
};

const SCAN_STEPS = [
  "Encrypting Proof…",
  "Generating ZK-Snark…",
  "Anchoring commitment on-chain…",
];

function PrivacyValidator() {
  const [input, setInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    if (!scanning) return;
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 650),
      setTimeout(() => setStep(2), 1300),
      setTimeout(() => {
        setScanning(false);
        setResult({
          key: `zk_${randHex(6)}-${randHex(6)}-${randHex(8)}`,
          shield: 100,
          target: input.trim() || `0x${randHex(38)}`,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 19) + "Z",
        });
      }, 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [scanning, input]);

  const handleValidate = () => {
    setResult(null);
    setScanning(true);
  };

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 backdrop-blur">
        <label className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          Transaction hash or wallet address
        </label>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2.5 focus-within:border-[color:var(--color-neon)]/60 focus-within:shadow-glow-cyan">
          <Fingerprint className="h-4 w-4 text-[color:var(--color-neon)]" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="0x9f8c…c1a4  or  arc1qzk…"
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <button
          onClick={handleValidate}
          disabled={scanning}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[color:var(--color-neon)] px-5 py-3 font-mono text-xs uppercase tracking-widest text-[color:var(--color-primary-foreground)] transition-all hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-70"
        >
          {scanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning…
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Validate Privacy State
            </>
          )}
        </button>

        {scanning && (
          <div className="mt-6 space-y-2">
            {SCAN_STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-2.5 font-mono text-xs transition-colors ${
                  i <= step ? "text-[color:var(--color-neon)]" : "text-muted-foreground/50"
                }`}
              >
                {i < step ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : i === step ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full border border-current" />
                )}
                {s}
              </div>
            ))}
            <div className="relative mt-3 h-0.5 overflow-hidden rounded bg-border/60">
              <div className="absolute inset-y-0 left-0 w-1/3 animate-scan bg-[color:var(--color-neon)]/70" />
            </div>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 backdrop-blur">
        {!result && !scanning && (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
            <div className="rounded-full border border-border p-3 text-muted-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Awaiting proof request
            </p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground/70">
              Submit any transaction or address to generate a zero-knowledge attestation.
            </p>
          </div>
        )}
        {scanning && !result && (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[color:var(--color-neon)]/40 animate-pulse-ring" />
              <Loader2 className="h-8 w-8 animate-spin text-[color:var(--color-neon)]" />
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[color:var(--color-neon)] animate-flicker">
              {SCAN_STEPS[step]}
            </p>
          </div>
        )}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-neon)]/40 bg-[color:var(--color-neon)]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-neon)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon)] animate-pulse-ring" />
                Status: SECURE
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{result.timestamp}</span>
            </div>
            <div className="mt-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Shield Level
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-mono text-4xl text-[color:var(--color-neon)] text-glow-cyan">
                  {result.shield}%
                </span>
                <span className="font-mono text-xs text-muted-foreground">ZK-SNARK verified</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[color:var(--color-neon)] to-[color:var(--color-violet-glow)]"
                  style={{ width: `${result.shield}%` }}
                />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Target
                </div>
                <div className="mt-1 truncate font-mono text-sm text-foreground">{result.target}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  ZK Verification Key
                </div>
                <div className="mt-1 rounded-md border border-[color:var(--color-violet-glow)]/30 bg-background/60 px-3 py-2 font-mono text-sm text-[color:var(--color-violet-glow)] text-glow-violet">
                  {result.key}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type SybilVerdict = { risk: "high" | "clear"; address: string; trust: number };

function SybilGuard() {
  const [addr, setAddr] = useState("");
  const [scanning, setScanning] = useState(false);
  const [verdict, setVerdict] = useState<SybilVerdict | null>(null);

  const handleScan = () => {
    if (!addr.trim()) return;
    setScanning(true);
    setVerdict(null);
    setTimeout(() => {
      const flagged = /farm|test/i.test(addr);
      setVerdict({
        risk: flagged ? "high" : "clear",
        address: addr.trim(),
        trust: flagged ? 0.12 + Math.random() * 0.15 : 0.88 + Math.random() * 0.1,
      });
      setScanning(false);
    }, 1200);
  };

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur">
        <label className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          Wallet address
        </label>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2.5 focus-within:border-[color:var(--color-violet-glow)]/60 focus-within:shadow-glow-violet">
          <Radar className="h-4 w-4 text-[color:var(--color-violet-glow)]" />
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="0x… paste an address to scan"
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <button
          onClick={handleScan}
          disabled={scanning || !addr.trim()}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[color:var(--color-violet-glow)]/40 bg-[color:var(--color-violet-glow)]/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-[color:var(--color-violet-glow)] transition-all hover:bg-[color:var(--color-violet-glow)]/20 hover:shadow-glow-violet disabled:cursor-not-allowed disabled:opacity-50"
        >
          {scanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning fingerprint…
            </>
          ) : (
            <>
              <Radar className="h-4 w-4" />
              Scan Address
            </>
          )}
        </button>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Heuristics: behavioral entropy, funding graph, temporal cadence, device attestation.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur">
        {!verdict && !scanning && (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
            <div className="rounded-full border border-border p-3 text-muted-foreground">
              <Radar className="h-6 w-6" />
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              No address scanned
            </p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground/70">
              Try inputs containing “farm” or “test” to trigger a high-risk verdict.
            </p>
          </div>
        )}
        {scanning && (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[color:var(--color-violet-glow)]" />
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[color:var(--color-violet-glow)] animate-flicker">
              Correlating identity graph…
            </p>
          </div>
        )}
        {verdict && verdict.risk === "high" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-[color:var(--color-danger)]/50 bg-[color:var(--color-danger)]/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-[color:var(--color-danger)]" />
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-danger)]">
                  🚨 Critical Risk
                </div>
                <p className="mt-1 text-sm text-foreground">
                  High risk of Sybil / Engagement Farming detected. Address flagged.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="rounded border border-[color:var(--color-danger)]/30 bg-background/40 p-2.5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Trust score</div>
                    <div className="mt-1 text-lg text-[color:var(--color-danger)]">{verdict.trust.toFixed(2)}</div>
                  </div>
                  <div className="rounded border border-[color:var(--color-danger)]/30 bg-background/40 p-2.5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Action</div>
                    <div className="mt-1 text-lg text-[color:var(--color-danger)]">Quarantine</div>
                  </div>
                </div>
                <div className="mt-3 truncate font-mono text-[11px] text-muted-foreground">
                  {verdict.address}
                </div>
              </div>
            </div>
          </div>
        )}
        {verdict && verdict.risk === "clear" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-[color:var(--color-success)]/50 bg-[color:var(--color-success)]/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[color:var(--color-success)]" />
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-success)]">
                  ✅ Cleared
                </div>
                <p className="mt-1 text-sm text-foreground">
                  Organic wallet fingerprint verified on Arc infrastructure.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="rounded border border-[color:var(--color-success)]/30 bg-background/40 p-2.5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Trust score</div>
                    <div className="mt-1 text-lg text-[color:var(--color-success)]">{verdict.trust.toFixed(2)}</div>
                  </div>
                  <div className="rounded border border-[color:var(--color-success)]/30 bg-background/40 p-2.5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Fingerprint</div>
                    <div className="mt-1 text-lg text-[color:var(--color-success)]">Organic</div>
                  </div>
                </div>
                <div className="mt-3 truncate font-mono text-[11px] text-muted-foreground">
                  {verdict.address}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DevGrid() {
  const tools = useMemo(
    () => [
      {
        icon: <Cpu className="h-5 w-5" />,
        title: "Arc Core SDK",
        desc: "Type-safe primitives for building ZK-native applications.",
        meta: "v4.2.1 · TS / Rust",
        accent: "cyan" as const,
      },
      {
        icon: <Network className="h-5 w-5" />,
        title: "RPC Endpoint Manager",
        desc: "Route, load-balance, and monitor validator endpoints.",
        meta: "42 regions · 99.99% SLA",
        accent: "violet" as const,
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        title: "Documentation Git-Sync",
        desc: "Docs that stay in lockstep with your deployed contracts.",
        meta: "Auto-generated · MDX",
        accent: "cyan" as const,
      },
    ],
    [],
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tools.map((t) => (
        <button
          key={t.title}
          className={`group relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 text-left backdrop-blur transition-all hover:-translate-y-1 ${
            t.accent === "cyan"
              ? "hover:border-[color:var(--color-neon)]/50 hover:shadow-glow-cyan"
              : "hover:border-[color:var(--color-violet-glow)]/50 hover:shadow-glow-violet"
          }`}
        >
          <div
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md border ${
              t.accent === "cyan"
                ? "border-[color:var(--color-neon)]/40 text-[color:var(--color-neon)]"
                : "border-[color:var(--color-violet-glow)]/40 text-[color:var(--color-violet-glow)]"
            }`}
          >
            {t.icon}
          </div>
          <h3 className="mt-5 font-display text-lg tracking-tight text-foreground">{t.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {t.meta}
            </span>
            <span
              className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest transition-transform group-hover:translate-x-0.5 ${
                t.accent === "cyan"
                  ? "text-[color:var(--color-neon)]"
                  : "text-[color:var(--color-violet-glow)]"
              }`}
            >
              Open <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 ${
              t.accent === "cyan"
                ? "via-[color:var(--color-neon)]/60"
                : "via-[color:var(--color-violet-glow)]/60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
      <div className="flex items-center gap-2.5">
        <ArcMark />
        <span className="font-mono text-[11px] tracking-[0.28em] text-muted-foreground">
          ARC.NETWORK · 2026
        </span>
      </div>
      <div className="font-mono text-[11px] text-muted-foreground">
        Built with zero-knowledge. Powered by the mesh.
      </div>
    </footer>
  );
}
