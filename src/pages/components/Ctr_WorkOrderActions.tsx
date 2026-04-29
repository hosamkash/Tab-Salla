import {
  ArrowRightLeft,
  CheckCheck,
  FileText,
  MessageSquare,
  SendHorizontal,
  UserRound,
} from "lucide-react";

export type WorkOrderPopupType =
  | "verify"
  | "forward"
  | "return"
  | "details"
  | "timeline"
  | "reassign"
  | "complete-request"
  | "complete-response"
  | "attachments"
  | "notes"
  | null;

type WorkOrderAction = {
  id: Exclude<WorkOrderPopupType, null>;
  label: string;
  icon: typeof CheckCheck;
};

export const workOrderActionItems: WorkOrderAction[] = [
  { id: "verify", label: "التحقق", icon: CheckCheck },
  { id: "forward", label: "تأكيد و ترحيل", icon: SendHorizontal },
  { id: "return", label: "إرجاع", icon: UserRound },
  { id: "timeline", label: "سجل التحركات", icon: ArrowRightLeft },
  { id: "reassign", label: "إعادة إسناد", icon: UserRound },
  { id: "complete-request", label: "طلب استكمال", icon: UserRound },
  { id: "complete-response", label: "الرد على الاستكمال", icon: UserRound },
  { id: "attachments", label: "قائمة المرفقات", icon: FileText },
  { id: "notes", label: "ملاحظات", icon: MessageSquare },
];

interface CtrWorkOrderActionsProps {
  onActionClick: (action: Exclude<WorkOrderPopupType, null>) => void;
  variant?: "menu" | "card";
}

export function Ctr_WorkOrderActions({
  onActionClick,
  variant = "menu",
}: CtrWorkOrderActionsProps) {
  return (
    <>
      {workOrderActionItems.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            type="button"
            className={
              variant === "card"
                ? "inline-flex w-full items-center gap-2 rounded-xl border border-white/70 bg-white/75 px-3 py-2 text-sm text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50 hover:text-rose-700 hover:shadow-[0_10px_18px_-12px_rgba(225,29,72,0.8)]"
                : ""
            }
            onClick={() => onActionClick(action.id)}
          >
            <Icon size={15} />
            <span>{action.label}</span>
          </button>
        );
      })}
    </>
  );
}
