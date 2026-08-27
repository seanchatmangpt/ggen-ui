<script setup lang="ts">
import type { ComponentDefinition, ComponentKind } from '~/types/ggen-ui'

defineProps<{ catalog: readonly ComponentDefinition[] }>()

const emit = defineEmits<{
  add: [kind: ComponentKind]
}>()
</script>

<template>
  <aside class="space-y-3" aria-label="Semantic component palette">
    <div>
      <p class="text-xs font-semibold uppercase tracking-wide text-muted">Palette</p>
      <h2 class="text-lg font-semibold">Admitted components</h2>
    </div>

    <UButton
      v-for="component in catalog"
      :key="component.kind"
      color="neutral"
      variant="outline"
      block
      class="justify-start text-left"
      :icon="component.icon"
      :aria-label="`Add ${component.label}`"
      @click="emit('add', component.kind)"
    >
      <span class="min-w-0">
        <span class="block font-medium">{{ component.label }}</span>
        <span class="block truncate text-xs text-muted">{{ component.description }}</span>
      </span>
    </UButton>
  </aside>
</template>
