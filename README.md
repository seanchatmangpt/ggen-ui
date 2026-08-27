# ggen-ui

`ggen-ui` is the visual construction surface for the ggen ecosystem: an ontology-driven workbench for turning admitted semantic capabilities into visible applications, dashboards, forms, panels, workflows, and other interactive projections.

It is deliberately **not** the same product as `ggen-marketplace`.

| Surface | Owns | Example |
| --- | --- | --- |
| `ggen` | deterministic semantic manufacture | RDF/SPARQL/template -> generated artifact |
| `ggen-marketplace` | reusable enterprise/industry/platform closure packs | "give this company the complete admitted industry platform" |
| `ggen-ui` | visual composition and projection | "build this visible application from admitted components/capabilities" |

## Correspondence

```text
public + ggen-ui ontology O*
        |
        v
      ggen
        |
        +--> generated component catalog / contracts
        |
        v
Nuxt 4 + Nuxt UI visual composer
        |
        +--> SELECT: choose semantic component
        +--> CONSTRUCT: place/configure/bind locally
        +--> PREVIEW: render reversible projection
        |
        v
 typed intent (no ambient DO authority)
        |
        v
 BRCE -> bounded server/Supabase/wasm4pm adapters -> consequence
        |
        v
 receipt -> replay -> standing
```

The first slice intentionally stops before external DO. It proves the product boundary with an ontology-manufactured component palette, a reversible local visual document, a composition canvas, and construct receipts. Supabase/process-engine integration is a later adapter boundary; presentation code does not get ambient write authority.

## Stack

- Nuxt 4
- Nuxt UI 4
- VueUse
- `@vite-pwa/nuxt`
- ggen-manufactured component catalog
- PROV-O, DCTERMS, and SKOS grounding in the canonical Turtle model

`wasm4pm-compat` remains the structural process-evidence contract for UI-facing process artifacts; full `wasm4pm` execution stays behind an authorized server/BRCE transport.

## Manufacture

Use the ggen runtime admitted by the marketplace operational law, but do **not** import the marketplace dashboard product model:

```bash
cd ../ggen-marketplace
bash scripts/admit-config.sh marketplace.toml /tmp/admitted-config.json >/dev/null
GGEN_BIN="$(bash scripts/install-ggen.sh /tmp/admitted-config.json)"

cd ../ggen-ui
"$GGEN_BIN" sync run
```

The canonical UI source is `ontology/ggen-ui.ttl`; `templates/component-catalog.ts.tmpl` projects it into `app/generated/component-catalog.ts`.

## Run

```bash
npm install
npm run prepare
npm run typecheck
npm run dev
```

Production court:

```bash
npm run build
npm run preview
```

## Current standing

The branch starts at `PARTIAL_ALIVE`: ontology manufacture and UI runtime are independently verifiable, but no live consequential BRCE transport is mounted by default. External DO must remain explicitly fenced until its authority and receipt path are observed end-to-end.
