import { baskets } from "@/data/work-orders-data";

export type StageDefinitionSeed = {
  id: string;
  stageCode: string;
  nameAr: string;
  nameEn: string;
  subScreen: string;
  pathCode: string;
  nextStatus: string;
  mandatory: boolean;
  canSkip: boolean;
  minAttachments: number;
  allowReturn: boolean;
  allowReassign: boolean;
  slaDays: number;
  stageColor: string;
  displayText: string;
  enabled: boolean;
};

const stagePalette = [
  "#0ea5e9",
  "#6366f1",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#22c55e",
  "#3b82f6",
  "#64748b",
  "#c026d3",
];

export const stageDefinitions: StageDefinitionSeed[] = baskets.map((basket, index) => ({
  id: `s-${basket.id}`,
  stageCode: `STG-${String(index + 1).padStart(3, "0")}`,
  nameAr: basket.name,
  nameEn: `Basket Stage ${index + 1}`,
  subScreen: `screen-${basket.id}`,
  pathCode: `PATH-${String((index % 10) + 1).padStart(3, "0")}`,
  nextStatus: "قيد التنفيذ",
  mandatory: true,
  canSkip: false,
  minAttachments: 1,
  allowReturn: true,
  allowReassign: true,
  slaDays: basket.slaDays,
  stageColor: stagePalette[index % stagePalette.length],
  displayText: `مرحلة ${basket.name}`,
  enabled: basket.enabled,
}));
