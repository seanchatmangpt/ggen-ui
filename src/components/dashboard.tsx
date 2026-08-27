"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AUTHORITY_STAGES, DASHBOARD_CONTRACT_VERSION, STANDING_STATES, standingDefinition, type Standing } from "@/generated/dashboard-contract";
import { DASHBOARD_PROJECTIONS } from "@/generated/projections";
import { constructIntent, preflightIntent } from "@/lib/brce";
import { DEMO_EVIDENCE, DEMO_RECEIPTS, DEMO_REPLAY, DEMO_SUBJECT } from "@/lib/fixtures";

function StandingBadge({ standing }: { standing: Standing }) {
  const definition = standingDefinition(standing);
  return <span className="badge" data-standing={standing} title={definition?.label ?? standing}>{standing}</span>;
}

function DashboardBody() {
  const [intentPreview, setIntentPreview] = useState<string>("");
  const evidence = useQuery({ queryKey: ["demo", "evidence"], queryFn: async () => DEMO_EVIDENCE, staleTime: Infinity }).data ?? [];
  const receipts = useQuery({ queryKey: ["demo", "receipts"], queryFn: async () => DEMO_RECEIPTS, staleTime: Infinity }).data ?? [];

  function manufactureBoundedIntent() {
    const intent = constructIntent({
      kind: "ACTUATE_VIA_BRCE",
      subject: DEMO_SUBJECT,
      payload: { operation: "replay", receiptId: DEMO_REPLAY[0]?.receiptId },
      requestedBy: "interactive-demo",
      expectedConsequence: "A BRCE implementation would evaluate replay authority; this UI does not actuate.",
    });
    const preflight = preflightIntent(intent, null, ["demo:no-live-authority"]);
    setIntentPreview(JSON.stringify(preflight, null, 2));
  }

  const standingCounts = useMemo(() => ({
    known: STANDING_STATES.length,
    evidence: evidence.length,
    receipts: receipts.length,
  }), [evidence.length, receipts.length]);

  return (
    <div className="shell">
      <aside className="rail" aria-label="Semantic projection navigation">
        <p className="eyebrow">ggen ecosystem</p>
        <h2 className="brand">GGEN // CONTROL SURFACE</h2>
        <p className="meta">Ontology-projected contracts. Zero ambient DO authority.</p>
        <nav className="nav">
          {DASHBOARD_PROJECTIONS.map((projection) => (
            <a className="nav-item" href={projection.route} key={projection.id} title={projection.description}>
              {projection.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">Admitted semantic dashboard contract v{DASHBOARD_CONTRACT_VERSION}</p>
            <h1>Evidence before standing.<br />Receipts before closure.</h1>
          </div>
          <StandingBadge standing="PARTIAL_ALIVE" />
        </header>

        <section className="grid" aria-label="Dashboard overview">
          <article className="card">
            <p className="eyebrow">Standing ontology</p>
            <div className="metric">{standingCounts.known}</div>
            <p className="meta">Named standing families. REFUSED remains typed at runtime.</p>
          </article>
          <article className="card">
            <p className="eyebrow">Evidence records</p>
            <div className="metric">{standingCounts.evidence}</div>
            <p className="meta">Fixture records remain explicitly separate by evidence kind.</p>
          </article>
          <article className="card">
            <p className="eyebrow">Receipts</p>
            <div className="metric">{standingCounts.receipts}</div>
            <p className="meta">Demonstration only. The fixture digest is deliberately non-cryptographic.</p>
          </article>

          <article className="card wide">
            <p className="eyebrow">Authority calculus</p>
            <h2>Only BRCE crosses DO</h2>
            <div className="pipeline" aria-label="Authority stages">
              {AUTHORITY_STAGES.map((stage, index) => (
                <span key={stage.code}>{stage.code}{stage.allowsDo ? " · DO" : ""}{index < AUTHORITY_STAGES.length - 1 ? " →" : ""}</span>
              ))}
            </div>
            <p className="meta">Planner output, queries, hooks, and UI controls can construct intents. They cannot acquire ambient execution authority.</p>
          </article>

          <article className="card">
            <p className="eyebrow">Live actuation</p>
            <h2>Fail closed</h2>
            <StandingBadge standing="BLOCKED" />
            <p className="meta">No live BRCE transport or authority is mounted in this demonstration.</p>
          </article>

          <article className="card wide">
            <p className="eyebrow">Evidence ledger</p>
            <h2>Claims preserve epistemic type</h2>
            <div className="stack">
              {evidence.map((record) => (
                <div className="row" key={record.id}>
                  <div><strong>{record.kind.toUpperCase()}</strong><div className="meta">{record.claim}</div></div>
                  <code className="code">{record.source}</code>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <p className="eyebrow">Receipt surface</p>
            <h2>{receipts[0]?.identity.id ?? "No receipt"}</h2>
            {receipts[0] ? <StandingBadge standing={receipts[0].standing} /> : null}
            <p className="meta code">{receipts[0]?.consequence}</p>
          </article>

          <article className="card full">
            <p className="eyebrow">CONSTRUCT court</p>
            <h2>Manufacture an intent without actuating</h2>
            <button className="action" type="button" onClick={manufactureBoundedIntent}>Construct replay intent</button>
            <p className="meta">The button constructs a typed intent and runs a no-authority preflight. It cannot submit a consequence.</p>
            {intentPreview ? <pre className="intent">{intentPreview}</pre> : null}
          </article>
        </section>
      </main>
    </div>
  );
}

export function Dashboard() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } }));
  return <QueryClientProvider client={queryClient}><DashboardBody /></QueryClientProvider>;
}
