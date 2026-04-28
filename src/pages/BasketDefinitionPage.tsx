import { useState } from "react";
import { Grid3X3, Pencil, Plus, Trash2 } from "lucide-react";
import { baskets } from "@/data/work-orders-data";
import { PageIntroHeader } from "@/components/PageIntroHeader";
import type { BasketDefinition } from "@/models/work-order";

type BasketFormState = {
  id: string;
  name: string;
  slaDays: string;
  section: string;
  sortOrder: string;
  enabled: boolean;
};

export function BasketDefinitionPage() {
  const [basketsState, setBasketsState] = useState<BasketDefinition[]>(baskets);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBasketId, setEditingBasketId] = useState<string | null>(null);
  const [formState, setFormState] = useState<BasketFormState>({
    id: "",
    name: "",
    slaDays: "",
    section: "",
    sortOrder: "",
    enabled: true,
  });

  const resetForm = () => {
    setFormState({
      id: "",
      name: "",
      slaDays: "",
      section: "",
      sortOrder: "",
      enabled: true,
    });
  };

  const handleAddBasket = () => {
    if (!formState.name.trim()) return;
    if (editingBasketId) {
      setBasketsState((prev) =>
        prev.map((basket) =>
          basket.id === editingBasketId
            ? {
                ...basket,
                name: formState.name.trim(),
                slaDays: Number(formState.slaDays) || 0,
                section: formState.section.trim() || "غير محدد",
                sortOrder: Number(formState.sortOrder) || basket.sortOrder,
                enabled: formState.enabled,
              }
            : basket,
        ),
      );
      setEditingBasketId(null);
      setIsAddDialogOpen(false);
      resetForm();
      return;
    }
    setBasketsState((prev) => [
      ...prev,
      {
        id: formState.id.trim() || `b-${Date.now()}`,
        name: formState.name.trim(),
        slaDays: Number(formState.slaDays) || 0,
        section: formState.section.trim() || "غير محدد",
        sortOrder: Number(formState.sortOrder) || prev.length + 1,
        enabled: formState.enabled,
      },
    ]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleToggleEnabled = (id: string) => {
    setBasketsState((prev) =>
      prev.map((basket) =>
        basket.id === id ? { ...basket, enabled: !basket.enabled } : basket,
      ),
    );
  };

  const handleDeleteBasket = (id: string) => {
    setBasketsState((prev) => prev.filter((basket) => basket.id !== id));
  };

  const handleEditBasket = (basket: BasketDefinition) => {
    setEditingBasketId(basket.id);
    setFormState({
      id: basket.id,
      name: basket.name,
      slaDays: String(basket.slaDays),
      section: basket.section,
      sortOrder: String(basket.sortOrder),
      enabled: basket.enabled,
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="تعريف السلة"
        description="إدارة السلال وتعريفاتها في النظام."
        icon={<Grid3X3 size={18} />}
        actions={
          <button
            className="btn btn-primary inline-flex items-center gap-2"
            onClick={() => {
              setEditingBasketId(null);
              resetForm();
              setIsAddDialogOpen(true);
            }}
          >
            <Plus size={16} />
            إضافة سلة جديدة
          </button>
        }
      />

      <section className="table-card card-surface">
        <table>
          <thead>
            <tr>
              <th>اسم السلة</th>
              <th>SLA</th>
              <th>القسم المسؤول</th>
              <th>ترتيب</th>
              <th>تفعيل</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {basketsState.map((basket) => (
              <tr key={basket.id}>
                <td>{basket.name}</td>
                <td>⏰ {basket.slaDays} يوم</td>
                <td>{basket.section}</td>
                <td>{basket.sortOrder}</td>
                <td>
                  <button
                    type="button"
                    className={basket.enabled ? "toggle on" : "toggle"}
                    onClick={() => handleToggleEnabled(basket.id)}
                    aria-label="تغيير حالة التفعيل"
                  />
                </td>
                <td>
                  <div className="actions-cell">
                    <button title="تعديل" onClick={() => handleEditBasket(basket)}>
                      <Pencil size={16} />
                    </button>
                    <button title="حذف" className="text-red-600" onClick={() => handleDeleteBasket(basket.id)}>
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
                {editingBasketId ? "تعديل السلة" : "تعريف سلة جديدة"}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 md:gap-2.5 md:p-2">
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">معرف السلة</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.id}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, id: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">اسم السلة</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">SLA بالأيام</label>
                <input
                  type="number"
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.slaDays}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, slaDays: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">القسم المسؤول</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.section}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, section: event.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">الترتيب</label>
                <input
                  type="number"
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.sortOrder}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, sortOrder: event.target.value }))
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
            </div>

            <div className="modal-footer !mt-0 border-t border-slate-200 px-4 py-2.5">
              <button
                className="btn btn-secondary !h-8 !px-3 !text-xs"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setEditingBasketId(null);
                  resetForm();
                }}
              >
                إلغاء
              </button>
              <button
                className="btn btn-primary !h-8 !px-3 !text-xs"
                onClick={handleAddBasket}
              >
                {editingBasketId ? "حفظ التعديل" : "حفظ السلة"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
