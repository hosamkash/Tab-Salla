import { useState } from "react";
import { Pencil, Plus, Trash2, UsersRound } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";

type OwnerItem = {
  id: string;
  employeeCode: string;
  name: string;
  jobTitle: string;
  department: string;
  mobile: string;
  email: string;
  enabled: boolean;
};

type OwnerFormState = {
  employeeCode: string;
  name: string;
  jobTitle: string;
  department: string;
  mobile: string;
  email: string;
  enabled: boolean;
};

const initialOwners: OwnerItem[] = [
  { id: "o1", employeeCode: "EMP-001", name: "أحمد سمير", jobTitle: "مهندس تشغيل", department: "تشغيل", mobile: "0501000001", email: "ahmed.s@tab.com", enabled: true },
  { id: "o2", employeeCode: "EMP-002", name: "محمد ياسر", jobTitle: "مسؤول متابعة", department: "مشاريع", mobile: "0501000002", email: "mohamed.y@tab.com", enabled: true },
  { id: "o3", employeeCode: "EMP-003", name: "سارة أشرف", jobTitle: "مراجع جودة", department: "جودة", mobile: "0501000003", email: "sara.a@tab.com", enabled: true },
  { id: "o4", employeeCode: "EMP-004", name: "خالد هشام", jobTitle: "مشرف مشاريع", department: "مشاريع", mobile: "0501000004", email: "khaled.h@tab.com", enabled: true },
  { id: "o5", employeeCode: "EMP-005", name: "ناصر العتيبي", jobTitle: "فني ميداني", department: "تشغيل", mobile: "0501000005", email: "nasser.a@tab.com", enabled: true },
  { id: "o6", employeeCode: "EMP-006", name: "رامي الصالح", jobTitle: "مهندس محطات", department: "مشاريع", mobile: "0501000006", email: "rami.s@tab.com", enabled: false },
  { id: "o7", employeeCode: "EMP-007", name: "مها الزهراني", jobTitle: "مدقق جودة", department: "جودة", mobile: "0501000007", email: "maha.z@tab.com", enabled: true },
  { id: "o8", employeeCode: "EMP-008", name: "وليد الحربي", jobTitle: "منسق إسناد", department: "تشغيل", mobile: "0501000008", email: "waleed.h@tab.com", enabled: true },
  { id: "o9", employeeCode: "EMP-009", name: "دعاء مصطفى", jobTitle: "مراجع مستندات", department: "جودة", mobile: "0501000009", email: "doaa.m@tab.com", enabled: false },
  { id: "o10", employeeCode: "EMP-010", name: "هاني بدوي", jobTitle: "مشرف عمليات", department: "تشغيل", mobile: "0501000010", email: "hani.b@tab.com", enabled: true },
];

export function OwnersPage() {
  const [ownersState, setOwnersState] = useState<OwnerItem[]>(initialOwners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<OwnerFormState>({
    employeeCode: "",
    name: "",
    jobTitle: "",
    department: "",
    mobile: "",
    email: "",
    enabled: true,
  });

  const resetForm = () => {
    setFormState({
      employeeCode: "",
      name: "",
      jobTitle: "",
      department: "",
      mobile: "",
      email: "",
      enabled: true,
    });
  };

  const saveOwner = () => {
    if (!formState.name.trim()) return;
    if (editingId) {
      setOwnersState((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...formState } : item)),
      );
    } else {
      setOwnersState((prev) => [...prev, { id: `o-${Date.now()}`, ...formState }]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="المسؤلين"
        description="إدارة بيانات الموظفين المسؤولين بشكل مختصر."
        icon={<UsersRound size={18} />}
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
            إضافة مسؤول جديد
          </button>
        }
      />

      <section className="table-card card-surface">
        <table>
          <thead>
            <tr>
              <th>كود الموظف</th>
              <th>الاسم</th>
              <th>المسمى الوظيفي</th>
              <th>القسم</th>
              <th>الجوال</th>
              <th>تفعيل</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {ownersState.map((owner) => (
              <tr key={owner.id}>
                <td>{owner.employeeCode}</td>
                <td>{owner.name}</td>
                <td>{owner.jobTitle}</td>
                <td>{owner.department}</td>
                <td>{owner.mobile}</td>
                <td>
                  <button
                    type="button"
                    className={owner.enabled ? "toggle on" : "toggle"}
                    onClick={() =>
                      setOwnersState((prev) =>
                        prev.map((item) =>
                          item.id === owner.id ? { ...item, enabled: !item.enabled } : item,
                        ),
                      )
                    }
                    aria-label="تغيير حالة التفعيل"
                  />
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      title="تعديل"
                      onClick={() => {
                        setEditingId(owner.id);
                        setFormState({
                          employeeCode: owner.employeeCode,
                          name: owner.name,
                          jobTitle: owner.jobTitle,
                          department: owner.department,
                          mobile: owner.mobile,
                          email: owner.email,
                          enabled: owner.enabled,
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
                        setOwnersState((prev) => prev.filter((item) => item.id !== owner.id))
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
              <h3 className="text-sm font-bold text-white">{editingId ? "تعديل المسؤول" : "تعريف مسؤول جديد"}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3 md:gap-2.5 md:p-2">
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">كود الموظف</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.employeeCode} onChange={(event) => setFormState((prev) => ({ ...prev, employeeCode: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">الاسم</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">المسمى الوظيفي</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.jobTitle} onChange={(event) => setFormState((prev) => ({ ...prev, jobTitle: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">القسم</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.department} onChange={(event) => setFormState((prev) => ({ ...prev, department: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">الجوال</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.mobile} onChange={(event) => setFormState((prev) => ({ ...prev, mobile: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">البريد الإلكتروني</label><input className="h-8 rounded-md border border-border px-2.5 text-xs" value={formState.email} onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))} /></div>
              <div className="flex flex-col gap-1 text-xs text-slate-600"><label className="field-label gap-1 text-xs text-slate-600">تفعيل</label><input type="checkbox" className="h-4 w-4" checked={formState.enabled} onChange={(event) => setFormState((prev) => ({ ...prev, enabled: event.target.checked }))} /></div>
            </div>
            <div className="modal-footer !mt-0 border-t border-slate-200 px-4 py-2.5">
              <button className="btn btn-secondary !h-8 !px-3 !text-xs" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </button>
              <button className="btn btn-primary !h-8 !px-3 !text-xs" onClick={saveOwner}>
                {editingId ? "حفظ التعديل" : "حفظ المسؤول"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
