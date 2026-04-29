import type {
  AppPageId,
  NavGroup,
  NavItem,
  PageMeta,
} from "@/models/navigation";

export const dashboardNavItem: NavItem = {
  id: "module-home",
  label: "الداشبورد",
};

export const navGroups: NavGroup[] = [
  {
    id: "settings",
    label: "الإعدادات",
    items: [
      { id: "stages", label: "المراحل (السلال)" },
      { id: "paths", label: "المسارات" },
      { id: "verification-items", label: "بنود التحقق" },
      { id: "states", label: "تعريف الحالة" },
      { id: "sections", label: "الأقسام" },
      { id: "sub-sections", label: "الأقسام الفرعية" },
      { id: "types", label: "أنواع أوامر العمل" },
      { id: "owners", label: "المسؤلين" },
    ],
  },
  {
    id: "workflows",
    label: "حركات العمل",
    items: [
      { id: "work-orders", label: "أوامر العمل" },
      { id: "work-order-details", label: "تفاصيل أوامر العمل" },
    ],
  },
];

export const pageMetaMap: Record<AppPageId, PageMeta> = {
  "module-home": {
    title: "Tab Salla",
    description: "منصة إدارة سلال أوامر العمل ومتابعة التشغيل.",
  },
  "work-orders": {
    title: "شاشة أوامر العمل",
    description:
      "متابعة دورة حياة أمر العمل عبر السلال وإدارة إجراءات التشغيل.",
  },
  "work-order-details": {
    title: "تفاصيل أوامر العمل",
    description: "عرض وتحديث تفاصيل أمر العمل والإجراءات المرتبطة به.",
  },
  "design-system": {
    title: "Design System",
    description:
      "عناصر الهوية البصرية والمكونات القياسية المستخدمة في الشاشات.",
  },
  "master-data": {
    title: "Master Data",
    description: "لوحة إعدادات التعريفات الرئيسية الخاصة بالموديول.",
  },
  "verification-items": {
    title: "بنود التحقق والجودة",
    description: "إدارة بنود التحقق الإلزامية وترتيبها حسب السلة.",
  },
  states: {
    title: "تعريف الحالة",
    description: "إعداد وتصنيف حالات أوامر العمل.",
  },
  sections: {
    title: "الأقسام",
    description: "إدارة الأقسام الرئيسية.",
  },
  "sub-sections": {
    title: "الأقسام الفرعية",
    description: "إدارة الأقسام الفرعية وربطها بالمسارات.",
  },
  types: {
    title: "أنواع أوامر العمل",
    description: "تعريف أنواع الطلبات التشغيلية.",
  },
  owners: {
    title: "المسؤلين",
    description: "إدارة بيانات الموظفين المسؤولين عن أوامر العمل.",
  },
  paths: {
    title: "المسارات",
    description: "إدارة المسارات وتعريف أكوادها ونص العرض الخاص بها.",
  },
  stages: {
    title: "المراحل",
    description: "إدارة مراحل العمل وخصائص كل مرحلة ضمن المسارات.",
  },
};
