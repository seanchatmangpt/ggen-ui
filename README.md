# ggen-ui

`ggen-ui` is the semantic control surface for the ggen ecosystem. It is a **consumer** of reusable `ggen-marketplace` manufacturing knowledge, not a second product ontology.

## Correspondence

```text
admitted ontology O*
  -> ggen-marketplace/ggen-dashboard-pack
  -> ggen sync run
  -> src/generated/{dashboard-contract.ts,dashboard-contract.json,projections.ts,semantic-tokens.css}
  -> maintained React semantic surfaces
  -> SELECT / CONSTRUCT
  -> authority preflight
  -> BRCE (exclusive DO)
  -> consequence
  -> receipt R
  -> replay / standing
```

The generated JSON contract is intentionally language-neutral so `ggen-legacy` can independently reconstruct and verify the received contract without parsing React code or certifying the ggen producer.

## Manufacture

Checkout `ggen-marketplace` as a sibling directory and use the marketplace-admitted ggen runtime:

```bash
cd ../ggen-marketplace
bash scripts/admit-config.sh marketplace.toml /tmp/admitted-config.json >/dev/null
GGEN_BIN="$(bash scripts/install-ggen.sh /tmp/admitted-config.json)"
cd ../ggen-ui
"$GGEN_BIN" sync run
```

Do not hand-edit `src/generated/**`.

## Application verification

After manufacture:

```bash
npm install
npm run verify:source
npm run typecheck
npm run build
```

The interactive page contains an explicit fixture-only evidence/receipt surface. It is not live evidence. The replay button constructs an intent and deliberately fails authority preflight; no BRCE transport is mounted by default.

## Runtime dependency direction

```text
domain page
  -> Chatman/ggen semantic dashboard component
  -> generated dashboard contracts
  -> bounded adapters
  -> implementation libraries
```

Vendor libraries must not become the public domain contract.

## Standing

A successful UI build is not the whole-system crown. `ALIVE` requires observed execution against the exact admitted subject and requested boundary. A browser build can coexist with `BLOCKED:NO_BRCE_TRANSPORT`; that is a truthful topology state, not a reason to fabricate actuation.
