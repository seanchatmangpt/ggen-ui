import { useLocalStorage } from '@vueuse/core'
import { COMPONENT_CATALOG } from '~/generated/component-catalog'
import type { ComponentKind, ConstructReceipt, VisualDocument } from '~/types/ggen-ui'

const createDocument = (): VisualDocument => ({
  schema: 'https://ggen.io/schema/ui-document/v1',
  id: 'local-composition',
  title: 'Untitled visual composition',
  revision: 0,
  nodes: []
})

const nextId = (kind: ComponentKind, revision: number) => `${kind}-${revision + 1}`

export const useGgenDocument = () => {
  const document = useLocalStorage<VisualDocument>('ggen-ui:document', createDocument())
  const lastReceipt = ref<ConstructReceipt | null>(null)

  const add = (kind: ComponentKind) => {
    const definition = COMPONENT_CATALOG.find(candidate => candidate.kind === kind)
    if (!definition) return

    const nodeId = nextId(kind, document.value.revision)
    document.value.nodes.push({
      id: nodeId,
      kind,
      title: definition.label,
      props: {}
    })
    document.value.revision += 1
    lastReceipt.value = {
      schema: 'https://ggen.io/schema/ui-construct-receipt/v1',
      receiptId: `construct-${document.value.id}-${document.value.revision}`,
      subjectId: document.value.id,
      kind: 'UI_CONSTRUCT',
      revision: document.value.revision,
      changedNodeId: nodeId,
      standing: 'PARTIAL_ALIVE'
    }
  }

  const remove = (nodeId: string) => {
    const previousLength = document.value.nodes.length
    document.value.nodes = document.value.nodes.filter(node => node.id !== nodeId)
    if (document.value.nodes.length === previousLength) return

    document.value.revision += 1
    lastReceipt.value = {
      schema: 'https://ggen.io/schema/ui-construct-receipt/v1',
      receiptId: `construct-${document.value.id}-${document.value.revision}`,
      subjectId: document.value.id,
      kind: 'UI_CONSTRUCT',
      revision: document.value.revision,
      changedNodeId: nodeId,
      standing: 'PARTIAL_ALIVE'
    }
  }

  const reset = () => {
    document.value = createDocument()
    lastReceipt.value = null
  }

  return {
    catalog: COMPONENT_CATALOG,
    document,
    lastReceipt,
    add,
    remove,
    reset
  }
}
