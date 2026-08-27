# ggen-ui

`ggen-ui` is the ontology-driven control-plane/dashboard projection for the ggen ecosystem. Its canonical product model is RDF/Turtle; ggen queries that graph and deterministically manufactures the executable JavaScript runtime and browser dashboard.

```text
ontology/ggen-ui.ttl
        ↓
  ggen sync run
        ↓
templates/*.tera
        ↓
generated/runtime.mjs + generated/index.html
        ↓
 independent execution verifier
        ↓
 ggen receipt → replay → standing
```

## Current bounded product

The first admitted slice implements the common kernel required by later React/Next adapters:

- the nine-stage `Parse → Route → Admit → Diagnose → Construct → Actuate → Receipt → Replay → Standing` lifecycle;
- the exact `UNKNOWN | PARTIAL_ALIVE | ALIVE | BLOCKED | BUILD_BROKEN | UNSUPPORTED` standing vocabulary;
- independent evidence dimensions for observed/admitted/executed/changed/verified/inferred/refused/blocked/unsupported;
- dashboard surfaces for admission/fence, evidence, BRCE, receipt/replay, and standing;
- a browser/Node runtime that **manufactures BRCE intents but has no external actuation path**;
- a zero-dependency dashboard shell that renders the generated semantic model;
- deterministic ggen regeneration plus receipt verification in CI.

The presentation layer is deliberately dependency-free at this boundary. A React/Next adapter can consume `generated/runtime.mjs` without changing the canonical ontology or acquiring DO authority.

## Run it

Node 20+ is sufficient for the independent verifier:

```bash
npm test
```

That command imports and executes the exact generated runtime, tests the standing/authority laws, starts an ephemeral HTTP server, serves `generated/index.html`, and fetches the exact page back over HTTP.

With ggen v26.8.25 installed:

```bash
ggen sync run --dry-run
ggen sync run
ggen receipt verify
npm test
```

The GitHub Actions verifier pins the Linux ggen v26.8.25 release archive by SHA-256 before running that full court and rejects projection drift with `git diff --exit-code`.

## Editing law

Edit only `ontology/ggen-ui.ttl` and `templates/*.tera` for generated behavior. `generated/*` are projections. The manifest uses overwrite-only generation rules; merge-mode output is intentionally excluded.

The UI is SELECT/CONSTRUCT territory. Consequential DO must remain behind a separately authorized BRCE adapter; the UI's `manufactureIntent()` function stops at a bounded intent envelope with `externalActuation: false`.

## Pack surface

`pack.toml` names this reusable manufacturing unit `ggen-dashboard-pack`. The repository is designed so the pack can be promoted into ggen-marketplace without changing the consumer ontology/runtime contract.
