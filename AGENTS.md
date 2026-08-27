# ggen-ui repository doctrine

## Purpose
`ggen-ui` is the ontology-driven **visual composition workbench** for the ggen ecosystem. It manufactures visible application surfaces from admitted semantic models. It is not the enterprise/industry closure catalog: reusable closure knowledge belongs in `ggen-marketplace`; the interactive composition surface belongs here.

The canonical product model is the admitted ontology. Generated component catalogs and semantic contracts are manufactured with ggen. Vue/Nuxt code must not become a second source of domain truth.

## Foundational order
Preserve -> Fence/Chesterton -> Calculus -> Exclusions -> Falsifier -> Extension -> Operationalization.

## Product boundary
- `ggen`: deterministic semantic manufacturer/compiler.
- `ggen-marketplace`: reusable packs that close bounded enterprise, industry, platform, and domain capability graphs.
- `ggen-ui`: visual selection, composition, binding, preview, inspection, and intent construction over admitted capability/component graphs.
- A marketplace pack may supply semantic capabilities to ggen-ui, but marketplace ownership never collapses into UI ownership.

## Runtime law
- Nuxt 4 is the application runtime; Nuxt UI is the canonical accessible component vocabulary.
- VueUse is the browser-interaction/composable layer.
- Installability/offline behavior is projected through `@vite-pwa/nuxt`.
- `wasm4pm-compat` is the structural process-evidence boundary visible to UI contracts. Full process execution belongs behind server/BRCE boundaries, never inside presentation code.
- Supabase is a permitted backend substrate only through bounded semantic adapters and BRCE for consequential writes. A raw Supabase client must not become the public domain contract.

## Authority and actuation
- Separate SELECT, CONSTRUCT, and DO.
- Drag/drop, palette selection, editing, preview, and local document changes are SELECT/CONSTRUCT.
- BRCE is the exclusive DO boundary for consequential external changes.
- UI controls manufacture typed intents; they never call consequential actuators directly.
- Zero unreceipted actuation. Successful DO paths must expose receipt identity and replay standing.
- Raw input, model/planner output, query results, semantic derivations, hooks, and generated UI events have no ambient execution authority.

## Generated boundaries
Canonical source surfaces:
- `ontology/ggen-ui.ttl`
- `ggen.toml`
- `templates/**`

Generated projections:
- `app/generated/**`

Do not hand-edit generated projections. Change ontology/templates and regenerate.

Human-maintained runtime surfaces:
- `app/components/**`
- `app/composables/**`
- `app/pages/**`
- `app/types/**`
- server adapters, tests, and verifier scripts

## Evidence vocabulary
Track observed, admitted, executed, changed, verified, inferred, refused, blocked, and unsupported separately. `UNKNOWN != ADMITTED`; `UNSUPPORTED != REFUSED`; inspection is not execution; workflow existence is not a successful run; a named receipt is not sufficient without receipt fields and subject identity.

Standing vocabulary: `UNKNOWN | PARTIAL_ALIVE | ALIVE | BLOCKED | BUILD_BROKEN | UNSUPPORTED` plus typed `REFUSED`.

## Verification
Run cheapest high-information gates first:
1. ontology/template/ggen manufacture
2. deterministic regeneration
3. Nuxt prepare + typecheck
4. production build
5. exact-head runtime smoke
6. browser/e2e/a11y interaction court
7. live BRCE/Supabase/process-engine courts when those transports are mounted

Do not weaken tests to obtain green. A build or SSR smoke is not proof of consequential DO.

## Dependencies
Prefer reusable ggen ecosystem knowledge and marketplace packs before handwritten consumer logic, but do not import an industry-closure pack merely to obtain presentation primitives. Vendor libraries sit behind semantic adapters; domain pages must not import vendor-specific data/actuation APIs when a semantic adapter exists.

## Git policy
Use purpose branches. Preserve exact base SHA. Do not force-push. Do not merge unless explicitly requested. Publish implementation work as a draft PR with exact-head verification evidence.
