import { useState } from "react";
import { GitBranch, Pencil, Plus, Trash2 } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";

type PathItem = {
  id: string;
  routeCode: string;
  nameAr: string;
  nameEn: string;
  displayText: string;
  enabled: boolean;
};

type PathFormState = {
  routeCode: string;
  nameAr: string;
  nameEn: string;
  displayText: string;
  enabled: boolean;
};

const initialPaths: PathItem[] = [
  {
    id: "p-1",
    routeCode: "PATH-001",
    nameAr: "مسار التنفيذ المدني",
    nameEn: "Civil Execution Path",
    displayText: "مسار التنفيذ المدني - مشاريع",
    enabled: true,
  },
  {
    id: "p-2",
    routeCode: "PATH-002",
    nameAr: "مسار تنفيذ المحطات",
    nameEn: "Stations Execution Path",
    displayText: "مسار تنفيذ المحطات والخلايا",
    enabled: true,
  },
  {
    id: "p-3",
    routeCode: "PATH-003",
    nameAr: "مسار العدادات",
    nameEn: "Meters Path",
    displayText: "مسار تنفيذ أعمال العدادات",
    enabled: true,
  },
  {
    id: "p-4",
    routeCode: "PATH-004",
    nameAr: "مسار الإسناد",
    nameEn: "Assignment Path",
    displayText: "مسار إسناد أوامر العمل للمسؤول",
    enabled: true,
  },
  {
    id: "p-5",
    routeCode: "PATH-005",
    nameAr: "مسار الكشفيات",
    nameEn: "Survey Path",
    displayText: "مسار المساحة والكشفيات",
    enabled: true,
  },
  {
    id: "p-6",
    routeCode: "PATH-006",
    nameAr: "مسار التصاريح",
    nameEn: "Permits Path",
    displayText: "مسار استخراج واعتماد التصاريح",
    enabled: true,
  },
  {
    id: "p-7",
    routeCode: "PATH-007",
    nameAr: "مسار GIS",
    nameEn: "GIS Path",
    displayText: "مسار الأزبلت وGIS",
    enabled: false,
  },
  {
    id: "p-8",
    routeCode: "PATH-008",
    nameAr: "مسار جودة المرفقات",
    nameEn: "Attachments Quality Path",
    displayText: "مسار مراجعة جودة المرفقات",
    enabled: true,
  },
  {
    id: "p-9",
    routeCode: "PATH-009",
    nameAr: "مسار المساندة الفنية",
    nameEn: "Technical Support Path",
    displayText: "مسار المساندة الفنية لأوامر العمل",
    enabled: false,
  },
  {
    id: "p-10",
    routeCode: "PATH-010",
    nameAr: "مسار المستخلصات",
    nameEn: "Invoices Path",
    displayText: "مسار المستخلصات والاعتماد المالي",
    enabled: true,
  },
];

export function PathsPage() {
  const [pathsState, setPathsState] = useState<PathItem[]>(initialPaths);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPathId, setEditingPathId] = useState<string | null>(null);
  const [formState, setFormState] = useState<PathFormState>({
    routeCode: "",
    nameAr: "",
    nameEn: "",
    displayText: "",
    enabled: true,
  });

  const resetForm = () => {
    setFormState({
      routeCode: "",
      nameAr: "",
      nameEn: "",
      displayText: "",
      enabled: true,
    });
  };

  const handleSavePath = () => {
    if (!formState.routeCode.trim() || !formState.nameAr.trim()) return;
    if (editingPathId) {
      setPathsState((prev) =>
        prev.map((path) =>
          path.id === editingPathId
            ? {
                ...path,
                routeCode: formState.routeCode.trim(),
                nameAr: formState.nameAr.trim(),
                nameEn: formState.nameEn.trim(),
                displayText: formState.displayText.trim(),
                enabled: formState.enabled,
              }
            : path,
        ),
      );
      setEditingPathId(null);
      setIsAddDialogOpen(false);
      resetForm();
      return;
    }
    setPathsState((prev) => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        routeCode: formState.routeCode.trim(),
        nameAr: formState.nameAr.trim(),
        nameEn: formState.nameEn.trim(),
        displayText: formState.displayText.trim(),
        enabled: formState.enabled,
      },
    ]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="المسارات"
        description="إدارة تعريف المسارات وربط أكواد المسار بنصوص العرض."
        icon={<GitBranch size={18} />}
        actions={
          <button
            className="btn btn-primary inline-flex items-center gap-2"
            onClick={() => {
              setEditingPathId(null);
              resetForm();
              setIsAddDialogOpen(true);
            }}
          >
            <Plus size={16} />
            إضافة مسار جديد
          </button>
        }
      />

      <section className="table-card card-surface">
        <table>
          <thead>
            <tr>
              <th>كود المسار</th>
              <th>اسم المسار عربي</th>
              <th>اسم المسار إنجليزي</th>
              <th>جملة العرض</th>
              <th>تفعيل</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {pathsState.map((path) => (
              <tr key={path.id}>
                <td>{path.routeCode}</td>
                <td>{path.nameAr}</td>
                <td>{path.nameEn}</td>
                <td>{path.displayText}</td>
                <td>
                  <button
                    type="button"
                    className={path.enabled ? "toggle on" : "toggle"}
                    onClick={() =>
                      setPathsState((prev) =>
                        prev.map((item) =>
                          item.id === path.id ? { ...item, enabled: !item.enabled } : item,
                        ),
                      )
                    }
                    aria-label="تغيير حالة تفعيل المسار"
                  />
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      title="تعديل"
                      onClick={() => {
                        setEditingPathId(path.id);
                        setFormState({
                          routeCode: path.routeCode,
                          nameAr: path.nameAr,
                          nameEn: path.nameEn,
                          displayText: path.displayText,
                          enabled: path.enabled,
                        });
                        setIsAddDialogOpen(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="حذف"
                      className="text-red-600"
                      onClick={() =>
                        setPathsState((prev) => prev.filter((item) => item.id !== path.id))
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

      {isAddDialogOpen ? (
        <div className="modal-backdrop" onClick={() => setIsAddDialogOpen(false)}>
          <div
            className="modal card-surface max-w-3xl overflow-hidden !p-0"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-[linear-gradient(90deg,#c8102e,#ef4444)] px-4 py-2.5 text-center">
              <h3 className="text-sm font-bold text-white">
                {editingPathId ? "تعديل المسار" : "تعريف مسار جديد"}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 md:gap-2.5 md:p-2">
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">كود المسار</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.routeCode}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, routeCode: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">اسم المسار عربي</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.nameAr}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, nameAr: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">اسم المسار إنجليزي</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.nameEn}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, nameEn: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">تفعيل</label>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={formState.enabled}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, enabled: event.target.checked }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600 col-span-2">
                <label className="field-label gap-1 text-xs text-slate-600">جملة العرض</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.displayText}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, displayText: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="modal-footer !mt-0 border-t border-slate-200 px-4 py-2.5">
              <button
                className="btn btn-secondary !h-8 !px-3 !text-xs"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setEditingPathId(null);
                  resetForm();
                }}
              >
                إلغاء
              </button>
              <button
                className="btn btn-primary !h-8 !px-3 !text-xs"
                onClick={handleSavePath}
              >
                {editingPathId ? "حفظ التعديل" : "حفظ المسار"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
