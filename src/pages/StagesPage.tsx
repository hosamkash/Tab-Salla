import { useState } from "react";
import { ArrowDown, ArrowUp, GitBranch, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";
import { masterOwners } from "@/data/master-data";
import { verificationItems } from "@/data/work-orders-data";
import { stageDefinitions } from "@/data/stages-data";

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

type StageUserRow = {
  id: string;
  userCode: string;
  userName: string;
  isDefault: boolean;
};

type StageChecklistRow = {
  id: string;
  itemCode: string;
  nameAr: string;
  nameEn: string;
  mandatory: boolean;
  sortOrder: number;
  enabled: boolean;
};

const initialStages: StageItem[] = stageDefinitions;

export function StagesPage() {
  const [stageScreenTab, setStageScreenTab] = useState<"stage" | "users" | "checklist">("stage");
  const [stagesState, setStagesState] = useState<StageItem[]>(initialStages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserCode, setSelectedUserCode] = useState("");
  const [selectedChecklistCode, setSelectedChecklistCode] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [stageUsers, setStageUsers] = useState<StageUserRow[]>([]);
  const [stageChecklist, setStageChecklist] = useState<StageChecklistRow[]>([]);
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

  const filteredOwnerOptions = masterOwners.filter((owner) => owner.enabled);

  const checklistSource = verificationItems.map((item, index) => ({
    id: item.id,
    itemCode: `CHK-${String(index + 1).padStart(3, "0")}`,
    nameAr: item.title,
    nameEn: `Checklist Item ${index + 1}`,
    mandatory: item.mandatory,
    sortOrder: item.sortOrder,
    enabled: true,
  }));

  const filteredChecklistOptions = checklistSource;

  const moveRow = <T,>(rows: T[], index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= rows.length) return rows;
    const next = [...rows];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    return next;
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
              setStageScreenTab("stage");
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

      {/* قائمة المراحل */}
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
                        setStageScreenTab("stage");
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

      {/* المرحلة */}
      {isDialogOpen ? (
        <div className="modal-backdrop" onClick={() => setIsDialogOpen(false)}>
          <div className="modal card-surface max-w-3xl overflow-hidden !p-0" onClick={(event) => event.stopPropagation()}>
            <div className="bg-[linear-gradient(90deg,#c8102e,#ef4444)] px-4 py-2.5 text-center">
              <h3 className="text-sm font-bold text-white">
                {editingId ? "تعديل المرحلة" : "تعريف مرحلة جديدة"}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-slate-200 bg-slate-50 p-2">
              <button className={stageScreenTab === "stage" ? "btn btn-primary !h-8 !text-xs" : "btn btn-secondary !h-8 !text-xs"} onClick={() => setStageScreenTab("stage")}>بيانات المرحلة</button>
              <button className={stageScreenTab === "users" ? "btn btn-primary !h-8 !text-xs" : "btn btn-secondary !h-8 !text-xs"} onClick={() => setStageScreenTab("users")}>المستخدمين</button>
              <button className={stageScreenTab === "checklist" ? "btn btn-primary !h-8 !text-xs" : "btn btn-secondary !h-8 !text-xs"} onClick={() => setStageScreenTab("checklist")}>قائمة التحقق</button>
            </div>

            {stageScreenTab === "stage" ? (
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
            ) : null}

            {stageScreenTab === "users" ? (
              <div className="max-h-[45vh] overflow-y-auto px-3 py-2">
                <section className="table-card card-surface">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">المستخدمين</h3>
                    <select
                      className="h-8 min-w-[220px] rounded-md border border-border bg-white px-2.5 text-xs"
                      value={selectedUserCode}
                      onChange={(event) => {
                        const code = event.target.value;
                        setSelectedUserCode(code);
                        if (!code) return;
                        const owner = filteredOwnerOptions.find((item) => item.employeeCode === code);
                        if (!owner) return;
                        setStageUsers((prev) => {
                          if (prev.some((row) => row.userCode === owner.employeeCode)) return prev;
                          return [
                            ...prev,
                            {
                              id: `u-${Date.now()}-${owner.id}`,
                              userCode: owner.employeeCode,
                              userName: owner.name,
                              isDefault: prev.length === 0,
                            },
                          ];
                        });
                        setSelectedUserCode("");
                      }}
                    >
                      <option value="">اختيار مستخدم للإضافة</option>
                      {filteredOwnerOptions.map((owner) => (
                        <option key={owner.id} value={owner.employeeCode}>
                          {owner.employeeCode} - {owner.name}
                        </option>
                      ))}
                    </select>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>كود المستخدم</th>
                      <th>اسم المستخدم</th>
                      <th>افتراضي</th>
                      <th>حذف</th>
                      <th>إعادة ترتيب الصفوف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stageUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{user.userCode}</td>
                        <td>{user.userName}</td>
                        <td>
                          <input
                            type="radio"
                            name="default-user"
                            checked={user.isDefault}
                            onChange={() =>
                              setStageUsers((prev) =>
                                prev.map((row) => ({ ...row, isDefault: row.id === user.id })),
                              )
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="text-red-600"
                            onClick={() => setStageUsers((prev) => prev.filter((row) => row.id !== user.id))}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                        <td>
                          <div className="inline-flex items-center gap-1">
                            <GripVertical size={14} className="text-slate-400" />
                            <button onClick={() => setStageUsers((prev) => moveRow(prev, index, "up"))}>
                              <ArrowUp size={13} />
                            </button>
                            <button onClick={() => setStageUsers((prev) => moveRow(prev, index, "down"))}>
                              <ArrowDown size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {stageUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-xs text-slate-500">
                          لا يوجد مستخدمين مضافين
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
                </section>
              </div>
            ) : null}

            {stageScreenTab === "checklist" ? (
              <div className="max-h-[45vh] overflow-y-auto px-3 py-2">
                <section className="table-card card-surface">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">قائمة التحقق</h3>
                    <select
                      className="h-8 min-w-[260px] rounded-md border border-border bg-white px-2.5 text-xs"
                      value={selectedChecklistCode}
                      onChange={(event) => {
                        const code = event.target.value;
                        setSelectedChecklistCode(code);
                        if (!code) return;
                        const item = filteredChecklistOptions.find((row) => row.itemCode === code);
                        if (!item) return;
                        setStageChecklist((prev) => {
                          if (prev.some((row) => row.itemCode === item.itemCode)) return prev;
                          return [
                            ...prev,
                            {
                              id: `c-${Date.now()}-${item.id}`,
                              itemCode: item.itemCode,
                              nameAr: item.nameAr,
                              nameEn: item.nameEn,
                              mandatory: item.mandatory,
                              sortOrder: prev.length + 1,
                              enabled: true,
                            },
                          ];
                        });
                        setSelectedChecklistCode("");
                      }}
                    >
                      <option value="">اختيار بند للإضافة</option>
                      {filteredChecklistOptions.map((item) => (
                        <option key={item.id} value={item.itemCode}>
                          {item.itemCode} - {item.nameAr}
                        </option>
                      ))}
                    </select>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>كود البند</th>
                      <th>اسم البند عربي</th>
                      <th>اسم البند إنجليزي</th>
                      <th>إلزامي</th>
                      <th>الترتيب</th>
                      <th>فعال</th>
                      <th>حذف</th>
                      <th>إعادة ترتيب الصفوف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stageChecklist.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.itemCode}</td>
                        <td>{item.nameAr}</td>
                        <td>{item.nameEn}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.mandatory}
                            onChange={(event) =>
                              setStageChecklist((prev) =>
                                prev.map((row) =>
                                  row.id === item.id ? { ...row, mandatory: event.target.checked } : row,
                                ),
                              )
                            }
                          />
                        </td>
                        <td>{item.sortOrder}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(event) =>
                              setStageChecklist((prev) =>
                                prev.map((row) =>
                                  row.id === item.id ? { ...row, enabled: event.target.checked } : row,
                                ),
                              )
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="text-red-600"
                            onClick={() => setStageChecklist((prev) => prev.filter((row) => row.id !== item.id))}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                        <td>
                          <div className="inline-flex items-center gap-1">
                            <GripVertical size={14} className="text-slate-400" />
                            <button onClick={() => setStageChecklist((prev) => moveRow(prev, index, "up"))}>
                              <ArrowUp size={13} />
                            </button>
                            <button onClick={() => setStageChecklist((prev) => moveRow(prev, index, "down"))}>
                              <ArrowDown size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {stageChecklist.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-4 text-center text-xs text-slate-500">
                          لا توجد بنود مضافة
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
                </section>
              </div>
            ) : null}

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
