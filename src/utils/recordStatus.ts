enum OrderStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
  CLOSED = 'CLOSED'
}

enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CASH = 'cash',
  PIX = 'pix'
}

const orderStatusLabels: Record<string, string> = {
  [OrderStatus.DRAFT]: 'Rascunho',
  [OrderStatus.IN_PROGRESS]: 'Em andamento',
  [OrderStatus.COMPLETED]: 'Concluído',
  [OrderStatus.PAID]: 'Pago',
  [OrderStatus.CLOSED]: 'Fechado'
}
const orderStatusColors: Record<OrderStatus, { background: string; color: string }> = {
  [OrderStatus.DRAFT]: { background: 'rgba(211, 211, 211, 0.1)', color: '#6c757d' }, // Cinza
  [OrderStatus.IN_PROGRESS]: { background: 'rgba(255, 167, 11, 0.1)', color: '#ffa70b' }, // Laranja
  [OrderStatus.COMPLETED]: { background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }, // Verde
  [OrderStatus.PAID]: { background: 'rgba(23, 162, 184, 0.1)', color: '#17a2b8' }, // Azul
  [OrderStatus.CLOSED]: { background: 'rgba(211, 64, 83, 0.1)', color: '#d34053' } // Vermelho
};

const tableStatusLabels: Record<string, string> = {
  [TableStatus.AVAILABLE]: 'Disponível',
  [TableStatus.OCCUPIED]: 'Ocupada',
  [TableStatus.RESERVED]: 'Reservada'
}

const roleLabels: Record<string, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.USER]: 'Usuário'
}

const paymentMethodsLabels: Record<string, string> = {
  [PaymentMethod.CREDIT_CARD]: 'Cartão de Crédito',
  [PaymentMethod.DEBIT_CARD]: 'Cartão de Débito',
  [PaymentMethod.CASH]: 'Dinheiro',
  [PaymentMethod.PIX]: 'Pix'
}

const getLabel = (key: string): string => {
  if (Object.values(OrderStatus).includes(key as OrderStatus)) {
    return orderStatusLabels[key] ?? 'Status desconhecido'
  }

  if (Object.values(TableStatus).includes(key as TableStatus)) {
    return tableStatusLabels[key] ?? 'Status desconhecido'
  }

  if (Object.values(Role).includes(key as Role)) {
    return roleLabels[key] ?? 'Função desconhecida'
  }
  if (Object.values(PaymentMethod).includes(key as PaymentMethod)) {
    return paymentMethodsLabels[key] ?? 'Forma de pagamento desconhecida'
  }

  return 'Valor desconhecido'
}

export { getLabel, OrderStatus, Role, TableStatus, orderStatusColors }
