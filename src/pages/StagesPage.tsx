import { useState } from "react";
import { GitBranch, Pencil, Plus, Trash2 } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";

type StageItem = {
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

type StageFormState = {
  stageCode: string;
  nameAr: string;
  nameEn: string;
  subScreen: string;
  pathCode: string;
  nextStatus: string;
  mandatory: boolean;
  canSkip: boolean;
  minAttachments: string;
  allowReturn: boolean;
  allowReassign: boolean;
  slaDays: string;
  stageColor: string;
  displayText: string;
  enabled: boolean;
};

const initialStages: StageItem[] = [
  { id: "s1", stageCode: "STG-001", nameAr: "استلام الطلب", nameEn: "Request Intake", subScreen: "screen-intake", pathCode: "PATH-001", nextStatus: "قيد المراجعة", mandatory: true, canSkip: false, minAttachments: 1, allowReturn: true, allowReassign: true, slaDays: 2, stageColor: "#0ea5e9", displayText: "استلام الطلب وتدقيق البيانات", enabled: true },
  { id: "s2", stageCode: "STG-002", nameAr: "مراجعة فنية", nameEn: "Technical Review", subScreen: "screen-review", pathCode: "PATH-001", nextStatus: "جاهز للإسناد", mandatory: true, canSkip: false, minAttachments: 2, allowReturn: true, allowReassign: true, slaDays: 3, stageColor: "#6366f1", displayText: "مراجعة فنية أولية", enabled: true },
  { id: "s3", stageCode: "STG-003", nameAr: "الإسناد", nameEn: "Assignment", subScreen: "screen-assign", pathCode: "PATH-004", nextStatus: "قيد التنفيذ", mandatory: true, canSkip: false, minAttachments: 1, allowReturn: false, allowReassign: true, slaDays: 1, stageColor: "#8b5cf6", displayText: "إسناد المهمة للمنفذ", enabled: true },
  { id: "s4", stageCode: "STG-004", nameAr: "التنفيذ", nameEn: "Execution", subScreen: "screen-exec", pathCode: "PATH-002", nextStatus: "قيد التحقق", mandatory: true, canSkip: false, minAttachments: 3, allowReturn: true, allowReassign: false, slaDays: 5, stageColor: "#10b981", displayText: "تنفيذ أعمال المرحلة", enabled: true },
  { id: "s5", stageCode: "STG-005", nameAr: "التحقق", nameEn: "Verification", subScreen: "screen-verify", pathCode: "PATH-008", nextStatus: "مكتمل", mandatory: true, canSkip: false, minAttachments: 2, allowReturn: true, allowReassign: true, slaDays: 2, stageColor: "#f59e0b", displayText: "التحقق من المخرجات", enabled: true },
  { id: "s6", stageCode: "STG-006", nameAr: "الاعتماد", nameEn: "Approval", subScreen: "screen-approve", pathCode: "PATH-006", nextStatus: "معتمد", mandatory: false, canSkip: true, minAttachments: 1, allowReturn: true, allowReassign: false, slaDays: 1, stageColor: "#ef4444", displayText: "اعتماد نتائج المرحلة", enabled: true },
  { id: "s7", stageCode: "STG-007", nameAr: "مساندة فنية", nameEn: "Technical Support", subScreen: "screen-support", pathCode: "PATH-009", nextStatus: "قيد التنفيذ", mandatory: false, canSkip: true, minAttachments: 0, allowReturn: false, allowReassign: true, slaDays: 2, stageColor: "#14b8a6", displayText: "دعم فني عند الحاجة", enabled: false },
  { id: "s8", stageCode: "STG-008", nameAr: "تحديث GIS", nameEn: "GIS Update", subScreen: "screen-gis", pathCode: "PATH-007", nextStatus: "قيد المراجعة", mandatory: false, canSkip: true, minAttachments: 1, allowReturn: true, allowReassign: false, slaDays: 2, stageColor: "#22c55e", displayText: "تحديث بيانات GIS", enabled: false },
  { id: "s9", stageCode: "STG-009", nameAr: "المستخلصات", nameEn: "Invoices", subScreen: "screen-invoice", pathCode: "PATH-010", nextStatus: "مغلق ماليًا", mandatory: true, canSkip: false, minAttachments: 2, allowReturn: true, allowReassign: false, slaDays: 4, stageColor: "#3b82f6", displayText: "استكمال الإجراءات المالية", enabled: true },
  { id: "s10", stageCode: "STG-010", nameAr: "إغلاق الطلب", nameEn: "Closure", subScreen: "screen-close", pathCode: "PATH-001", nextStatus: "مغلق", mandatory: true, canSkip: false, minAttachments: 1, allowReturn: false, allowReassign: false, slaDays: 1, stageColor: "#64748b", displayText: "إغلاق أمر العمل نهائيًا", enabled: true },
];

export function StagesPage() {
  const [stagesState, setStagesState] = useState<StageItem[]>(initialStages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<StageFormState>({
    stageCode: "",
    nameAr: "",
    nameEn: "",
    subScreen: "",
    pathCode: "",
    nextStatus: "",
    mandatory: false,
    canSkip: false,
    minAttachments: "0",
    allowReturn: false,
    allowReassign: false,
    slaDays: "1",
    stageColor: "#0ea5e9",
    displayText: "",
    enabled: true,
  });

  const resetForm = () => {
    setFormState({
      stageCode: "",
      nameAr: "",
      nameEn: "",
      subScreen: "",
      pathCode: "",
      nextStatus: "",
      mandatory: false,
      canSkip: false,
      minAttachments: "0",
      allowReturn: false,
      allowReassign: false,
      slaDays: "1",
      stageColor: "#0ea5e9",
      displayText: "",
      enabled: true,
    });
  };

  const saveStage = () => {
    if (!formState.stageCode.trim() || !formState.nameAr.trim()) return;
    if (editingId) {
      setStagesState((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                stageCode: formState.stageCode.trim(),
                nameAr: formState.nameAr.trim(),
                nameEn: formState.nameEn.trim(),
                subScreen: formState.subScreen.trim(),
                pathCode: formState.pathCode.trim(),
                nextStatus: formState.nextStatus.trim(),
                mandatory: formState.mandatory,
                canSkip: formState.canSkip,
                minAttachments: Number(formState.minAttachments) || 0,
                allowReturn: formState.allowReturn,
                allowReassign: formState.allowReassign,
                slaDays: Number(formState.slaDays) || 1,
                stageColor: formState.stageColor,
                displayText: formState.displayText.trim(),
                enabled: formState.enabled,
              }
            : item,
        ),
      );
    } else {
      setStagesState((prev) => [
        ...prev,
        {
          id: `s-${Date.now()}`,
          stageCode: formState.stageCode.trim(),
          nameAr: formState.nameAr.trim(),
          nameEn: formState.nameEn.trim(),
          subScreen: formState.subScreen.trim(),
          pathCode: formState.pathCode.trim(),
          nextStatus: formState.nextStatus.trim(),
          mandatory: formState.mandatory,
          canSkip: formState.canSkip,
          minAttachments: Number(formState.minAttachments) || 0,
          allowReturn: formState.allowReturn,
          allowReassign: formState.allowReassign,
          slaDays: Number(formState.slaDays) || 1,
          stageColor: formState.stageColor,
          displayText: formState.displayText.trim(),
          enabled: formState.enabled,
        },
      ]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="المراحل"
        description="إدارة تعريف المراحل وربطها بالمسارات وخصائص التنفيذ."
        icon={<GitBranch size={18} />}
        actions={
          <button
            className="btn btn-primary inline-flex items-center gap-2"
            onClick={() => {
              setEditingId(null);
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            <Plus size={16} />
            إضافة مرحلة جديدة
          </button>
        }
      />

      <section className="table-card card-surface">
        <table>
          <thead>
            <tr>
              <th>كود المرحلة</th>
              <th>اسم المرحلة عربي</th>
              <th>كود المسار</th>
              <th>الحالة التالية</th>
              <th>SLA</th>
              <th>تفعيل</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {stagesState.map((stage) => (
              <tr key={stage.id}>
                <td>{stage.stageCode}</td>
                <td>{stage.nameAr}</td>
                <td>{stage.pathCode}</td>
                <td>{stage.nextStatus}</td>
                <td>{stage.slaDays} يوم</td>
                <td>
                  <button
                    type="button"
                    className={stage.enabled ? "toggle on" : "toggle"}
                    onClick={() =>
                      setStagesState((prev) =>
                        prev.map((item) =>
                          item.id === stage.id ? { ...item, enabled: !item.enabled } : item,
                        ),
                      )
                    }
                    aria-label="تغيير حالة تفعيل المرحلة"
                  />
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      title="تعديل"
                      onClick={() => {
                        setEditingId(stage.id);
                        setFormState({
                          stageCode: stage.stageCode,
                          nameAr: stage.nameAr,
                          nameEn: stage.nameEn,
                          subScreen: stage.subScreen,
                          pathCode: stage.pathCode,
                          nextStatus: stage.nextStatus,
                          mandatory: stage.mandatory,
                          canSkip: stage.canSkip,
                          minAttachments: String(stage.minAttachments),
                          allowReturn: stage.allowReturn,
                          allowReassign: stage.allowReassign,
                          slaDays: String(stage.slaDays),
                          stageColor: stage.stageColor,
                          displayText: stage.displayText,
                          enabled: stage.enabled,
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="حذف"
                      className="text-red-600"
                      onClick={() =>
                        setStagesState((prev) => prev.filter((item) => item.id !== stage.id))
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isDialogOpen ? (
        <div className="modal-backdrop" onClick={() => setIsDialogOpen(false)}>
          <div className="modal card-surface max-w-3xl overflow-hidden !p-0" onClick={(event) => event.stopPropagation()}>
            <div className="bg-[linear-gradient(90deg,#c8102e,#ef4444)] px-4 py-2.5 text-center">
              <h3 className="text-sm font-bold text-white">
                {editingId ? "تعديل المرحلة" : "تعريف مرحلة جديدة"}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 md:gap-2.5 md:p-2">
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">كود المرحلة</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.stageCode} onChange={(event) => setFormState((prev) => ({ ...prev, stageCode: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">اسم المرحلة عربي</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.nameAr} onChange={(event) => setFormState((prev) => ({ ...prev, nameAr: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">اسم المرحلة الإنجليزي</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.nameEn} onChange={(event) => setFormState((prev) => ({ ...prev, nameEn: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">الشاشة الفرعية</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.subScreen} onChange={(event) => setFormState((prev) => ({ ...prev, subScreen: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">كود المسار</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.pathCode} onChange={(event) => setFormState((prev) => ({ ...prev, pathCode: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">الحالة التالية</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.nextStatus} onChange={(event) => setFormState((prev) => ({ ...prev, nextStatus: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">إلزامية</label><input type="checkbox" className="h-4 w-4" checked={formState.mandatory} onChange={(event) => setFormState((prev) => ({ ...prev, mandatory: event.target.checked }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">يمكن تخطيها</label><input type="checkbox" className="h-4 w-4" checked={formState.canSkip} onChange={(event) => setFormState((prev) => ({ ...prev, canSkip: event.target.checked }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">الحد الأدنى لعدد المرفقات</label><input type="number" className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.minAttachments} onChange={(event) => setFormState((prev) => ({ ...prev, minAttachments: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">تسمح بالإرجاع</label><input type="checkbox" className="h-4 w-4" checked={formState.allowReturn} onChange={(event) => setFormState((prev) => ({ ...prev, allowReturn: event.target.checked }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">تسمح بإعادة الإسناد</label><input type="checkbox" className="h-4 w-4" checked={formState.allowReassign} onChange={(event) => setFormState((prev) => ({ ...prev, allowReassign: event.target.checked }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">عدد أيام SLA</label><input type="number" className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.slaDays} onChange={(event) => setFormState((prev) => ({ ...prev, slaDays: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">لون المرحلة</label><input type="color" className="h-8 rounded-md border border-border px-1.5" value={formState.stageColor} onChange={(event) => setFormState((prev) => ({ ...prev, stageColor: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">تفعيل</label><input type="checkbox" className="h-4 w-4" checked={formState.enabled} onChange={(event) => setFormState((prev) => ({ ...prev, enabled: event.target.checked }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600 col-span-2"><label className="field-label gap-1 text-xs text-slate-600">جملة العرض</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.displayText} onChange={(event) => setFormState((prev) => ({ ...prev, displayText: event.target.value }))} /></div>
            </div>

            <div className="modal-footer !mt-0 border-t border-slate-200 px-4 py-2.5">
              <button className="btn btn-secondary !h-8 !px-3 !text-xs" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </button>
              <button className="btn btn-primary !h-8 !px-3 !text-xs" onClick={saveStage}>
                {editingId ? "حفظ التعديل" : "حفظ المرحلة"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
