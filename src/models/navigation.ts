export type AppPageId =
  | "module-home"
  | "work-orders"
  | "work-order-details"
  | "design-system"
  | "master-data"
  | "basket-definition"
  | "verification-items"
  | "states"
  | "sections"
  | "sub-sections"
  | "types"
  | "owners"
  | "paths"
  | "stages";

export interface NavItem {
  id: AppPageId;
  label: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export interface PageMeta {
  title: string;
  description: string;
}
