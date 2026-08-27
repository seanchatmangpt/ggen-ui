<script setup lang="ts">
const { catalog, document, lastReceipt, add, remove, reset } = useGgenDocument()
</script>

<template>
  <main class="min-h-screen bg-default p-4 md:p-6">
    <div class="mx-auto max-w-[1600px] space-y-6">
      <header class="flex flex-col gap-4 border-b border-default pb-5 md:flex-row md:items-end md:justify-between">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <UBadge color="primary" variant="subtle">GGen UI</UBadge>
            <UBadge color="warning" variant="subtle">PARTIAL_ALIVE</UBadge>
          </div>
          <h1 class="text-3xl font-semibold tracking-tight">Visual composition, not industry closure</h1>
          <p class="max-w-3xl text-sm text-muted">Build visible projections from admitted semantic components. Marketplace packs can supply capabilities; this workbench owns selection, composition, preview, and typed intent construction.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-muted">Revision {{ document.revision }}</span>
          <UButton color="neutral" variant="outline" icon="i-lucide-rotate-ccw" @click="reset">Reset local document</UButton>
        </div>
      </header>

      <div class="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)_20rem]">
        <GgenPalette :catalog="catalog" @add="add" />

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-muted">Document</p>
              <h2 class="text-lg font-semibold">{{ document.title }}</h2>
            </div>
            <UBadge color="neutral" variant="outline">{{ document.nodes.length }} nodes</UBadge>
          </div>
          <GgenCanvas :nodes="document.nodes" @remove="remove" />
        </div>

        <aside class="space-y-4" aria-label="Construction inspector">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-muted">Inspector</p>
            <h2 class="text-lg font-semibold">Authority & receipt</h2>
          </div>

          <UCard>
            <dl class="space-y-3 text-sm">
              <div>
                <dt class="text-xs text-muted">SELECT</dt>
                <dd>Palette and local document</dd>
              </div>
              <div>
                <dt class="text-xs text-muted">CONSTRUCT</dt>
                <dd>Reversible local composition</dd>
              </div>
              <div>
                <dt class="text-xs text-muted">DO</dt>
                <dd><UBadge color="warning" variant="subtle">No BRCE transport mounted</UBadge></dd>
              </div>
            </dl>
          </UCard>

          <UCard>
            <template #header>
              <span class="font-medium">Latest construct receipt</span>
            </template>
            <pre v-if="lastReceipt" class="overflow-auto whitespace-pre-wrap text-xs">{{ JSON.stringify(lastReceipt, null, 2) }}</pre>
            <p v-else class="text-sm text-muted">Add or remove a component to manufacture a local construct receipt.</p>
          </UCard>
        </aside>
      </div>
    </div>
  </main>
</template>
