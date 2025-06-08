import { OrderProps } from "@/types/order.type"


export function calculateTotalOrder(orders: OrderProps) {
  return orders.items.reduce((total, item) => {
    const itemTotal = item.product.price * item.amount
    return total + itemTotal
  }, 0)
}
