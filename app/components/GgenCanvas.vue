<script setup lang="ts">
import type { VisualNode } from '~/types/ggen-ui'

defineProps<{ nodes: VisualNode[] }>()

const emit = defineEmits<{
  remove: [nodeId: string]
}>()
</script>

<template>
  <section class="min-h-[32rem] rounded-xl border border-dashed border-default bg-elevated/40 p-4" aria-label="Visual composition canvas">
    <div v-if="nodes.length === 0" class="grid min-h-[28rem] place-items-center text-center">
      <div class="max-w-sm space-y-2">
        <UIcon name="i-lucide-panels-top-left" class="mx-auto size-8 text-muted" />
        <h2 class="text-lg font-semibold">Canvas is reversible</h2>
        <p class="text-sm text-muted">Choose a semantic component from the palette. Composition changes stay local and construct-only.</p>
      </div>
    </div>

    <div v-else class="grid gap-4 lg:grid-cols-2">
      <UCard v-for="node in nodes" :key="node.id" class="relative">
        <template #header>
          <div class="flex items-start justify-between gap-3">
            <div>
              <UBadge color="neutral" variant="subtle" size="sm">{{ node.kind }}</UBadge>
              <h3 class="mt-2 font-semibold">{{ node.title }}</h3>
            </div>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              size="sm"
              :aria-label="`Remove ${node.title}`"
              @click="emit('remove', node.id)"
            />
          </div>
        </template>

        <div class="space-y-3">
          <div v-if="node.kind === 'stat-card'" class="text-3xl font-semibold">42</div>
          <div v-else-if="node.kind === 'data-table'" class="grid grid-cols-3 gap-2 text-xs">
            <span v-for="cell in ['Subject', 'Standing', 'Receipt']" :key="cell" class="rounded bg-muted px-2 py-2">{{ cell }}</span>
          </div>
          <div v-else-if="node.kind === 'form'" class="space-y-2">
            <UInput placeholder="Semantic field" disabled />
            <UButton disabled>Construct intent</UButton>
          </div>
          <div v-else-if="node.kind === 'chart'" class="flex h-24 items-end gap-2">
            <span v-for="height in [35, 70, 48, 88, 58]" :key="height" class="w-full rounded-t bg-primary" :style="{ height: `${height}%` }" />
          </div>
          <div v-else class="rounded-lg bg-muted p-4 text-sm text-muted">Semantic preview for {{ node.kind }}</div>
          <p class="text-xs text-muted">{{ node.id }}</p>
        </div>
      </UCard>
    </div>
  </section>
</template>
