import type { EvidenceRecord, Receipt, ReplayNode, SubjectIdentity } from "@/generated/dashboard-contract";

export const DEMO_SUBJECT: SubjectIdentity = {
  repository: "seanchatmangpt/ggen-ui",
  ref: "feat/ggen-ui-v26.8.27",
  environment: "DEMO_FIXTURE_NOT_LIVE",
};

export const DEMO_EVIDENCE: readonly EvidenceRecord[] = [
  { id: "e-observed", kind: "observed", subject: DEMO_SUBJECT, claim: "Repository and branch identity observed.", source: "fixture:demo" },
  { id: "e-admitted", kind: "admitted", subject: DEMO_SUBJECT, claim: "Dashboard ontology admitted for projection.", source: "fixture:demo" },
  { id: "e-blocked", kind: "blocked", subject: DEMO_SUBJECT, claim: "No live BRCE transport is attached to the demonstration surface.", source: "fixture:demo" },
];

export const DEMO_RECEIPTS: readonly Receipt[] = [
  {
    identity: { id: "receipt-demo-001", digest: "DEMO-NOT-A-CRYPTOGRAPHIC-RECEIPT", algorithm: "sha256" },
    subject: DEMO_SUBJECT,
    intentId: "intent-demo-001",
    authority: "fixture-only",
    consequence: "Rendered bounded demonstration data only; no external actuation occurred.",
    standing: "PARTIAL_ALIVE",
    evidenceIds: ["e-observed", "e-admitted", "e-blocked"],
  },
];

export const DEMO_REPLAY: readonly ReplayNode[] = [
  { receiptId: "receipt-demo-001", parents: [], subject: DEMO_SUBJECT, standing: "PARTIAL_ALIVE" },
];
