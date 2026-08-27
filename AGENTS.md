# ggen-ui repository doctrine

## Purpose
`ggen-ui` is the proprietary semantic dashboard/runtime projection for the ggen ecosystem. The canonical domain model is the admitted ontology; generated contracts and projection manifests are manufactured from it with ggen. UI code must not become a second source of truth.

## Foundational order
Preserve -> Fence/Chesterton -> Calculus -> Exclusions -> Falsifier -> Extension -> Operationalization.

## Authority and actuation
- Separate OBSERVE/SELECT, CONSTRUCT, and DO.
- BRCE is the exclusive DO boundary. UI controls manufacture typed intents; they never call actuators directly.
- Zero unreceipted actuation. Successful DO paths must expose receipt identity and replay standing.
- Model/planner output, query results, semantic derivations, hooks, and raw user input have no ambient execution authority.

## Generated boundaries
Canonical source surfaces:
- `ontology/ggen-ui.ttl`
- `ggen.toml`
- `templates/**`

Generated projections:
- `src/generated/**`

Do not hand-edit generated projections. Change ontology/templates and regenerate.

Human-maintained runtime surfaces:
- `src/components/**`
- `src/lib/**`
- `src/app/**`
- tests and verifier scripts

Runtime code may implement adapters and accessible primitives, but public semantic contracts belong to the generated layer whenever possible.

## Evidence vocabulary
Track observed, admitted, executed, changed, verified, inferred, refused, blocked, and unsupported separately. `UNKNOWN != ADMITTED`; `UNSUPPORTED != REFUSED`; inspection is not execution; workflow existence is not a successful run; a named receipt is not sufficient without receipt fields and subject identity.

Standing vocabulary: `UNKNOWN | PARTIAL_ALIVE | ALIVE | BLOCKED | BUILD_BROKEN | UNSUPPORTED` plus typed `REFUSED`.

## Verification
Run cheapest high-information gates first:
1. ontology/template/static verifier
2. deterministic ggen regeneration + zero diff
3. TypeScript/typecheck
4. unit/contract tests
5. production build
6. browser/e2e/a11y verification

Do not weaken tests to obtain green. Encode discovered failures as permanent guards where practical.

## Dependencies
Prefer the ggen ecosystem and reusable marketplace packs before handwritten consumer code. Vendor libraries sit behind Chatman semantic adapters; domain pages must not import vendor-specific UI/data APIs directly when a semantic adapter exists.

## Git policy
Use purpose branches after the repository seed exists. Preserve exact base SHA. Do not force-push. Do not merge unless explicitly requested. Publish implementation work as a draft PR with exact-head verification evidence.
