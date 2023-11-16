export enum UserRole {
  ADMIN = "admin",
  GENERAL = "general",
  TRIAL = "trial",
  SUSPENDED = "suspended",
}

export enum UserStatus {
  PENDING = "pending",
  ACTIVE = "active",
  SUSPENDED = "suspended",
}

export enum TransactionType {
  INCREASE = "increase",
  DECREASE = "decrease",
  SAME_CURRENCY_TRANSFER = "same_currency_transfer",
  DIFFERENT_CURRENCY_TRANSFER = "different_currency_transfer",
}
