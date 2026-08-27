import type { BrcePreflight, ConstructedIntent, Receipt, SubjectIdentity } from "@/generated/dashboard-contract";

export interface BrceTransport {
  submit<TPayload>(preflight: BrcePreflight<TPayload>): Promise<Receipt>;
}

export interface IntentInput<TPayload> {
  kind: ConstructedIntent<TPayload>["kind"];
  subject: SubjectIdentity;
  payload: TPayload;
  requestedBy: string;
  expectedConsequence: string;
}

export function constructIntent<TPayload>(input: IntentInput<TPayload>): ConstructedIntent<TPayload> {
  return {
    id: crypto.randomUUID(),
    kind: input.kind,
    stage: "CONSTRUCT",
    subject: input.subject,
    payload: input.payload,
    requestedBy: input.requestedBy,
    expectedConsequence: input.expectedConsequence,
  };
}

export function preflightIntent<TPayload>(
  intent: ConstructedIntent<TPayload>,
  authority: string | null,
  policyWitnesses: readonly string[],
): BrcePreflight<TPayload> {
  if (!authority) {
    return {
      intent,
      stage: "PREFLIGHT",
      admitted: false,
      authority: null,
      policyWitnesses,
      refusal: "REFUSED:NO_AUTHORITY",
    };
  }

  return {
    intent,
    stage: "PREFLIGHT",
    admitted: true,
    authority,
    policyWitnesses,
  };
}

export async function submitViaBrce<TPayload>(
  preflight: BrcePreflight<TPayload>,
  transport: BrceTransport | null,
): Promise<Receipt> {
  if (!preflight.admitted || preflight.refusal) {
    throw new Error(preflight.refusal ?? "REFUSED:PREFLIGHT");
  }
  if (!preflight.authority) {
    throw new Error("REFUSED:NO_AUTHORITY");
  }
  if (!transport) {
    throw new Error("BLOCKED:NO_BRCE_TRANSPORT");
  }

  const receipt = await transport.submit(preflight);
  if (receipt.intentId !== preflight.intent.id) {
    throw new Error("REFUSED:RECEIPT_INTENT_MISMATCH");
  }
  if (receipt.subject.digest && preflight.intent.subject.digest && receipt.subject.digest !== preflight.intent.subject.digest) {
    throw new Error("REFUSED:RECEIPT_SUBJECT_MISMATCH");
  }
  return receipt;
}
