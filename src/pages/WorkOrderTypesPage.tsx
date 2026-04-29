import { useState } from "react";
import { ClipboardList, Pencil, Plus, Trash2 } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";
import { masterWorkOrderTypes } from "@/data/master-data";

type WorkOrderTypeItem = {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

type WorkOrderTypeForm = {
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

const initialTypes: WorkOrderTypeItem[] = masterWorkOrderTypes;

export function WorkOrderTypesPage() {
  const [types, setTypes] = useState<WorkOrderTypeItem[]>(initialTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<WorkOrderTypeForm>({
    code: "",
    name: "",
    description: "",
    enabled: true,
  });

  const resetForm = () => setForm({ code: "", name: "", description: "", enabled: true });

  const saveType = () => {
    if (!form.code.trim() || !form.name.trim()) return;
    if (editingId) {
      setTypes((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
    } else {
      setTypes((prev) => [...prev, { id: `wt-${Date.now()}`, ...form }]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="أنواع أوامر العمل"
        description="إدارة أنواع أوامر العمل وتعريف بياناتها."
        icon={<ClipboardList size={18} />}
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
            إضافة نوع جديد
          </button>
        }
      />

      <section className="table-card card-surface">
        <table>
          <thead>
            <tr>
              <th>كود</th>
              <th>اسم</th>
              <th>وصف</th>
              <th>تفعيل</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.code}</td>
                <td>{type.name}</td>
                <td>{type.description}</td>
                <td>
                  <button
                    type="button"
                    className={type.enabled ? "toggle on" : "toggle"}
                    onClick={() =>
                      setTypes((prev) =>
                        prev.map((item) => (item.id === type.id ? { ...item, enabled: !item.enabled } : item)),
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
                        setEditingId(type.id);
                        setForm({
                          code: type.code,
                          name: type.name,
                          description: type.description,
                          enabled: type.enabled,
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="حذف"
                      className="text-red-600"
                      onClick={() => setTypes((prev) => prev.filter((item) => item.id !== type.id))}
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
              <h3 className="text-sm font-bold text-white">{editingId ? "تعديل نوع أمر العمل" : "تعريف نوع أمر عمل جديد"}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3 md:gap-2.5 md:p-2">
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">كود</label>
                <input className="h-8 rounded-md border border-border px-2.5 text-xs" value={form.code} onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))} />
              </div>
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">اسم</label>
                <input className="h-8 rounded-md border border-border px-2.5 text-xs" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
              </div>
              <div className="flex flex-col gap-1 text-xs text-slate-600 col-span-2">
                <label className="field-label gap-1 text-xs text-slate-600">وصف</label>
                <input className="h-8 rounded-md border border-border px-2.5 text-xs" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
              </div>
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">تفعيل</label>
                <input type="checkbox" className="h-4 w-4" checked={form.enabled} onChange={(event) => setForm((prev) => ({ ...prev, enabled: event.target.checked }))} />
              </div>
            </div>
            <div className="modal-footer !mt-0 border-t border-slate-200 px-4 py-2.5">
              <button className="btn btn-secondary !h-8 !px-3 !text-xs" onClick={() => setIsDialogOpen(false)}>إلغاء</button>
              <button className="btn btn-primary !h-8 !px-3 !text-xs" onClick={saveType}>{editingId ? "حفظ التعديل" : "حفظ النوع"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
