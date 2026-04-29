import { useState } from "react";
import { GitBranch, Pencil, Plus, Trash2 } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";
import { masterSections } from "@/data/master-data";

type SectionItem = {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

type SectionForm = {
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

const initialSections: SectionItem[] = masterSections;

export function SectionsPage() {
  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<SectionForm>({
    code: "",
    name: "",
    description: "",
    enabled: true,
  });

  const resetForm = () => setForm({ code: "", name: "", description: "", enabled: true });

  const saveSection = () => {
    if (!form.code.trim() || !form.name.trim()) return;
    if (editingId) {
      setSections((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
    } else {
      setSections((prev) => [...prev, { id: `sec-${Date.now()}`, ...form }]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="الأقسام"
        description="إدارة الأقسام الرئيسية في النظام."
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
            إضافة قسم جديد
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
            {sections.map((section) => (
              <tr key={section.id}>
                <td>{section.code}</td>
                <td>{section.name}</td>
                <td>{section.description}</td>
                <td>
                  <button
                    type="button"
                    className={section.enabled ? "toggle on" : "toggle"}
                    onClick={() =>
                      setSections((prev) =>
                        prev.map((item) => (item.id === section.id ? { ...item, enabled: !item.enabled } : item)),
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
                        setEditingId(section.id);
                        setForm({
                          code: section.code,
                          name: section.name,
                          description: section.description,
                          enabled: section.enabled,
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="حذف"
                      className="text-red-600"
                      onClick={() => setSections((prev) => prev.filter((item) => item.id !== section.id))}
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
              <h3 className="text-sm font-bold text-white">{editingId ? "تعديل القسم" : "تعريف قسم جديد"}</h3>
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
              <button className="btn btn-primary !h-8 !px-3 !text-xs" onClick={saveSection}>{editingId ? "حفظ التعديل" : "حفظ القسم"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
