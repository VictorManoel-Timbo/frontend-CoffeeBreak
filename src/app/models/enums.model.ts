export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
  PREPARING = 'PREPARING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export enum WithdrawalMethod {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY'
}

export enum PaymentMethod {
  PIX = 'PIX',
  TICKET = 'TICKET',
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

export enum ProductAvailable {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE'
}

export enum StockType {
  DRY = 'DRY',
  REFRIGERATOR = 'REFRIGERATOR',
  FREEZER = 'FREEZER'
}

export enum IngredientType {
  POWDERED = 'POWDERED',
  LIQUID = 'LIQUID',
  PERISHABLE = 'PERISHABLE'
}