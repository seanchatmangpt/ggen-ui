export type ComponentKind =
  | 'page-header'
  | 'stat-card'
  | 'data-table'
  | 'form'
  | 'chart'
  | 'command-palette'
  | 'receipt-panel'
  | 'chat-panel'

export interface ComponentDefinition {
  kind: ComponentKind
  label: string
  description: string
  icon: string
}

export interface VisualNode {
  id: string
  kind: ComponentKind
  title: string
  props: Record<string, string | number | boolean>
}

export interface VisualDocument {
  schema: 'https://ggen.io/schema/ui-document/v1'
  id: string
  title: string
  revision: number
  nodes: VisualNode[]
}

export interface ConstructReceipt {
  schema: 'https://ggen.io/schema/ui-construct-receipt/v1'
  receiptId: string
  subjectId: string
  kind: 'UI_CONSTRUCT'
  revision: number
  changedNodeId: string
  standing: 'PARTIAL_ALIVE'
}
