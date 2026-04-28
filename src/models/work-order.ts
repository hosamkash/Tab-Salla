export type WorkOrderStatus = "قيد التنفيذ" | "متأخر" | "مكتمل" | "قيد المراجعة";

export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  createdAt: string;
  section: string;
  type: string;
  status: WorkOrderStatus;
  currentBasket: string;
  ownerName: string;
  ownerInitials: string;
  value: number;
  daysInBasket: number;
  slaDays: number;
}

export interface KpiCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export interface BasketDefinition {
  id: string;
  name: string;
  slaDays: number;
  section: string;
  sortOrder: number;
  enabled: boolean;
}

export interface VerificationItem {
  id: string;
  basket: string;
  title: string;
  description: string;
  mandatory: boolean;
  sortOrder: number;
}

export interface TimelineItem {
  id: string;
  date: string;
  fromBasket: string;
  toBasket: string;
  user: string;
  note: string;
}
