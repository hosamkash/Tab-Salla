import { useMemo, useState } from "react";
import { GripVertical, Plus, ShieldCheck, Trash2 } from "lucide-react";
import {
  CtrDropdownSearch,
  type SearchOption,
} from "@/components/core/CtrDropdownSearch";
import {
  baskets,
  employeeOptions,
  verificationItems,
} from "@/data/work-orders-data";
import { PageIntroHeader } from "@/components/PageIntroHeader";

type VerificationFormState = {
  verificationId: string;
  recipientId: string;
  workOrderNumber: string;
  stage: string;
  verificationTitle: string;
  checked: boolean;
  verificationDate: string;
  byUser: string;
  notes: string;
};

export function VerificationItemsPage() {
  const [basketFilter, setBasketFilter] = useState(baskets[0]?.name ?? "");
  const [itemsState, setItemsState] = useState(verificationItems);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formState, setFormState] = useState<VerificationFormState>({
    verificationId: "",
    recipientId: "",
    workOrderNumber: "",
    stage: "",
    verificationTitle: "",
    checked: false,
    verificationDate: "",
    byUser: "",
    notes: "",
  });

  const basketOptions = useMemo<SearchOption[]>(
    () =>
      baskets.map((basket) => ({
        id: basket.id,
        value: basket.name,
        label: basket.name,
      })),
    [],
  );
  const employeeDropdownOptions = useMemo<SearchOption[]>(
    () =>
      employeeOptions.map((employee) => ({
        id: employee.id,
        value: employee.name,
        label: employee.name,
      })),
    [],
  );
  const filteredItems = useMemo(
    () =>
      itemsState
        .filter((item) => item.basket === basketFilter)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [itemsState, basketFilter],
  );

  const handleMandatoryToggle = (id: string) => {
    setItemsState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, mandatory: !item.mandatory } : item,
      ),
    );
  };

  const handleDropOnRow = (targetId: string) => {
    if (!draggedItemId || draggedItemId === targetId) {
      setDraggedItemId(null);
      return;
    }
    const orderedIds = filteredItems.map((item) => item.id);
    const fromIndex = orderedIds.indexOf(draggedItemId);
    const toIndex = orderedIds.indexOf(targetId);
    if (fromIndex === -1 || toIndex === -1) {
      setDraggedItemId(null);
      return;
    }
    orderedIds.splice(toIndex, 0, orderedIds.splice(fromIndex, 1)[0]);
    const nextOrderMap = new Map(
      orderedIds.map((id, index) => [id, index + 1]),
    );
    setItemsState((prev) =>
      prev.map((item) =>
        item.basket === basketFilter && nextOrderMap.has(item.id)
          ? { ...item, sortOrder: nextOrderMap.get(item.id) ?? item.sortOrder }
          : item,
      ),
    );
    setDraggedItemId(null);
  };

  const handleDelete = (id: string) => {
    setItemsState((prev) => prev.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setFormState({
      verificationId: "",
      recipientId: "",
      workOrderNumber: "",
      stage: "",
      verificationTitle: "",
      checked: false,
      verificationDate: "",
      byUser: "",
      notes: "",
    });
  };

  const handleAddItem = () => {
    if (!formState.verificationTitle.trim()) return;
    const nextSort = filteredItems.length + 1;
    setItemsState((prev) => [
      ...prev,
      {
        id: formState.verificationId.trim() || `v-${Date.now()}`,
        basket: basketFilter,
        title: formState.verificationTitle.trim(),
        description:
          formState.notes.trim() ||
          `مرحلة: ${formState.stage || "-"} | أمر العمل: ${formState.workOrderNumber || "-"}`,
        mandatory: formState.checked,
        sortOrder: nextSort,
      },
    ]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  return (
    <div className="generic-page">
      <PageIntroHeader
        title="بنود التحقق والجودة"
        description="إدارة بنود التحقق والجودة وربطها بسلال أوامر العمل."
        icon={<ShieldCheck size={18} />}
        actions={
          <button
            className="btn btn-primary inline-flex items-center gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={16} /> إضافة بند جديد
          </button>
        }
      />

      <section className="filters-bar card-surface">
        <div className="w-full max-w-5xl">
          <label className="mb-1 block text-xs font-semibold text-slate-600">المرحلة (السلة)</label>
          <CtrDropdownSearch
            data={basketOptions}
            value={basketFilter}
            onValueChange={setBasketFilter}
            placeholder="اختر المرحلة (السلة)"
            searchPlaceholder="ابحث عن مرحلة (سلة)"
            width="100%"
            matchTriggerWidth
            triggerClassName="h-11"
            showCheckIcon={false}
          />
        </div>
      </section>

      <section className="table-card card-surface">
        <table>
          <thead>
            <tr>
              <th>اسم البند</th>
              <th>الوصف</th>
              <th>إلزامي</th>
              <th>الترتيب بالسحب</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    type="button"
                    className={item.mandatory ? "toggle on" : "toggle"}
                    onClick={() => handleMandatoryToggle(item.id)}
                    aria-label="تغيير حالة الإلزامي"
                  />
                </td>
                <td>
                  <div
                    className="drag-cell cursor-grab"
                    draggable
                    onDragStart={() => setDraggedItemId(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleDropOnRow(item.id)}
                  >
                    <GripVertical size={16} />
                    <span>{item.sortOrder}</span>
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      title="حذف"
                      className="text-red-600"
                      onClick={() => handleDelete(item.id)}
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
        <div
          className="modal-backdrop"
          onClick={() => setIsAddDialogOpen(false)}
        >
          <div
            className="modal card-surface max-w-3xl overflow-hidden !p-0"
            onClick={(event) => event.stopPropagation()}
          >
            {/* هيدر المودال */}
            <div className="bg-[linear-gradient(90deg,#c8102e,#ef4444)] px-4 py-2.5 text-center">
              <h3 className="text-sm text-white font-bold">
                تعريف بند التحقق
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-2 md:gap-2.5 md:p-2">
              
              {/* معرف التحقق */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">
                  معرف التحقق
                </label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.verificationId}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      verificationId: event.target.value,
                    }))
                  }
                />
              </div>

              {/* معرف المستقبل */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">
                  معرف المستقبل
                </label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.recipientId}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      recipientId: event.target.value,
                    }))
                  }
                />
              </div>

              {/* أمر العمل */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">أمر العمل</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.workOrderNumber}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      workOrderNumber: event.target.value,
                    }))
                  }
                />
              </div>
                  
              {/* المرحلة */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">المرحلة</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.stage}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      stage: event.target.value,
                    }))
                  }
                />
              </div>

              {/* بند التحقق */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">بند التحقق</label>
                <input
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.verificationTitle}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      verificationTitle: event.target.value,
                    }))
                  }
                />
              </div>
              
              {/* تم التحقق */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">تم التحقق</label>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={formState.checked}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      checked: event.target.checked,
                    }))
                  }
                />
              </div>

              {/* تاريخ التحقق */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">تاريخ التحقق</label>
                <input
                  type="date"
                  className="h-8 rounded-md border border-border px-2.5 text-xs"
                  value={formState.verificationDate}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      verificationDate: event.target.value,
                    }))
                  }
                />
              </div>
              
              {/* بواسطة */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <label className="field-label gap-1 text-xs text-slate-600">بواسطة</label>
                <CtrDropdownSearch
                  data={employeeDropdownOptions}
                  value={formState.byUser}
                  onValueChange={(value) =>
                    setFormState((prev) => ({ ...prev, byUser: value }))
                  }
                  placeholder="اختر الموظف"
                  searchPlaceholder="ابحث عن موظف"
                  width="100%"
                  matchTriggerWidth
                  triggerClassName="h-8 text-xs"
                  showCheckIcon={false}
                />
              </div>

              {/* ملاحظات */}
              <div className="flex flex-col gap-1 text-xs text-slate-600 md:col-span-2">
                <label className="field-label gap-1 text-xs text-slate-600">ملاحظات</label>
                <textarea
                  className="rounded-md border border-border px-2.5 py-1.5 text-xs"
                  rows={3}
                  value={formState.notes}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      notes: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* هيدر المودال و الأزرار */}
            <div className="modal-footer !mt-0 border-t border-slate-200 px-4 py-2.5">
              <button
                className="btn btn-secondary !h-8 !px-3 !text-xs"
                onClick={() => setIsAddDialogOpen(false)}
              >
                إلغاء
              </button>
              <button
                className="btn btn-primary !h-8 !px-3 !text-xs"
                onClick={handleAddItem}
              >
                حفظ البند
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
