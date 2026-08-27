# AGENTS.md — ggen-ui

## Authority and source law

`ontology/ggen-ui.ttl` is the canonical product graph. `templates/*.tera` are manufacturing rules. `generated/*` are projections and MUST NOT be hand-edited. Change the ontology or template, run ggen, inspect the receipt, then commit the projection.

The repository implements `A = μ(O*)`: admit the graph and authority boundary before manufacture. BRCE is the exclusive DO path. Browser hooks and generated runtime functions may manufacture intents, but MUST NOT perform external consequential actuation.

## Standing vocabulary

Use only `UNKNOWN`, `PARTIAL_ALIVE`, `ALIVE`, `BLOCKED`, `BUILD_BROKEN`, and `UNSUPPORTED` for capability standing. A refusal must be typed separately. `ALIVE` requires observed execution against the exact admitted subject.

Track `observed`, `admitted`, `executed`, `changed`, `verified`, `inferred`, `refused`, `blocked`, and `unsupported` independently. Inspection is not execution; a workflow is not a successful run; a generated file is not proof of regeneration.

## Canonical commands

```bash
# safe admission pass
ggen sync run --dry-run

# manufacture projections + ggen receipt
ggen sync run

# verify the ggen receipt chain
ggen receipt verify

# execute the repository's independent verifier
npm test
```

`ggen.toml` uses `mode = "Overwrite"` only. Do not introduce merge-mode generation without an explicit ownership/marker design and a regression proof.

## Change discipline

1. Preserve the graph→query→template→runtime→receipt correspondence.
2. Prefer extending this pack or another ggen-marketplace pack over hand-writing consumer copies.
3. Do not add a frontend framework merely to wrap the same model. React/Next adapters are presentation projections over the public runtime contract.
4. Do not add network mutation APIs to the generated runtime. DO belongs behind an authorized BRCE adapter outside this pack.
5. Verification must execute `generated/runtime.mjs` and serve `generated/index.html`; text inspection alone is insufficient.
