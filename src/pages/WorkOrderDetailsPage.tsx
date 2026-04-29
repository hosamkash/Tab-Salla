import { useState } from "react";
import { AlertTriangle, ArrowRight, FileText, Sparkles } from "lucide-react";
import type { WorkOrder } from "@/models/work-order";
import { PageIntroHeader } from "@/components/PageIntroHeader";
import { baskets } from "@/data/work-orders-data";
import {
  masterOwners,
  masterSections,
  masterStates,
  masterSubSections,
  masterWorkOrderTypes,
} from "@/data/master-data";
import {
  Ctr_WorkOrderActions,
  type WorkOrderPopupType,
} from "@/pages/components/Ctr_WorkOrderActions";
import { Ctr_WorkOrderActionDialogs } from "@/pages/components/Ctr_WorkOrderActionDialogs";

interface WorkOrderDetailsPageProps {
  order: WorkOrder | null;
  onBack: () => void;
}

export function WorkOrderDetailsPage({ order, onBack }: WorkOrderDetailsPageProps) {
  const [activePopup, setActivePopup] = useState<WorkOrderPopupType>(null);
  const isCreateMode = !order;
  const orderData: WorkOrder = order ?? {
    id: "new-order",
    workOrderNumber: "WO-2026-NEW",
    createdAt: "2026-04-28",
    section: "مشاريع",
    type: "تمديد كابلات",
    status: "قيد التنفيذ",
    currentBasket: "سلة الإسناد",
    ownerName: "غير محدد",
    ownerInitials: "--",
    value: 0,
    daysInBasket: 0,
    slaDays: 7,
  };
  const statusOptions = masterStates.filter((item) => item.enabled).map((item) => item.name);
  const sectionOptions = masterSections.filter((item) => item.enabled).map((item) => item.name);
  const subSectionOptions = masterSubSections.filter((item) => item.enabled).map((item) => item.name);
  const typeOptions = masterWorkOrderTypes.filter((item) => item.enabled).map((item) => item.name);
  const ownerOptions = masterOwners.filter((item) => item.enabled).map((item) => item.name);
  const basketOptions = baskets.filter((item) => item.enabled).map((item) => item.name);
  const daysRatio = Math.min((orderData.daysInBasket / orderData.slaDays) * 100, 140);
  const isOverSla = orderData.daysInBasket > orderData.slaDays;

  const renderCombo = (label: string, defaultValue: string, options: string[]) => {
    const uniqueOptions = options.includes(defaultValue) ? options : [defaultValue, ...options];
    return (
      <label>
        <span className="mb-1 block text-xs text-slate-500">{label}</span>
        <select
          className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          defaultValue={defaultValue}
        >
          {uniqueOptions.map((option) => (
            <option key={`${label}-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div className="grid gap-4">
      <PageIntroHeader
        title="تفاصيل أوامر العمل"
        description={
          isCreateMode
            ? "إنشاء أمر عمل جديد بنفس بنية تفاصيل شاشة أوامر العمل."
            : "عرض تفاصيل أمر العمل وحالة التنفيذ وسجل الإجراءات."
        }
        icon={<FileText size={18} />}
        actions={
          <button className="btn btn-secondary inline-flex items-center gap-2" type="button" onClick={onBack}>
            <ArrowRight size={16} />
            <span>العودة لأوامر العمل</span>
          </button>
        }
      />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="card-surface rounded-2xl p-4 xl:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-slate-900">البيانات الأساسية</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label>
              <span className="mb-1 block text-xs text-slate-500">رقم أمر العمل</span>
              <input
                className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                defaultValue={orderData.workOrderNumber}
              />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">الحالة</span>
              <select className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.status}>
                {(statusOptions.includes(orderData.status) ? statusOptions : [orderData.status, ...statusOptions]).map((option) => (
                  <option key={`status-${option}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">تاريخ أمر العمل</span>
              <input type="date" className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.createdAt} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">تاريخ الانتهاء</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue="2026-05-05" />
            </label>
            {renderCombo("القسم الرئيسي", orderData.section, sectionOptions)}
            {renderCombo("القسم الفرعي", "تنفيذ مدني", subSectionOptions)}
            {renderCombo("النوع", orderData.type, typeOptions)}
            {renderCombo("المسؤول", orderData.ownerName, ownerOptions)}
            <label>
              <span className="mb-1 block text-xs text-slate-500">قيمة أمر العمل</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.value.toLocaleString("en-US")} />
            </label>
            {renderCombo("السلة الحالية", orderData.currentBasket, basketOptions)}
            <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-50 p-3 shadow-sm md:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Sparkles size={14} className="text-amber-500" />
                  أيام التواجد بالسلة
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${isOverSla ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {isOverSla ? <AlertTriangle size={12} /> : <Sparkles size={12} />}
                  {isOverSla ? "تجاوز SLA" : "ضمن SLA"}
                </span>
              </div>
              <div className="mb-2 flex items-end justify-between">
                <p className="text-2xl font-bold text-slate-900">
                  {orderData.daysInBasket}
                  <span className="mr-1 text-sm font-medium text-slate-500">يوم</span>
                </p>
                <p className="text-xs text-slate-600">المسموح: {orderData.slaDays} أيام</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/80">
                <div
                  className={`h-full rounded-full transition-all ${isOverSla ? "bg-gradient-to-r from-rose-500 to-orange-500" : "bg-gradient-to-r from-emerald-500 to-indigo-500"}`}
                  style={{ width: `${daysRatio}%` }}
                />
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-rose-100 bg-[linear-gradient(155deg,#fff7f8_0%,#ffeef1_45%,#fff9f6_100%)] p-4 shadow-[0_14px_28px_-18px_rgba(190,24,93,0.35)]">
          <div className="mb-4 rounded-xl border border-rose-100/80 bg-white/80 px-3 py-2.5 backdrop-blur">
            <p className="text-[11px] font-semibold tracking-wide text-rose-500">WORK ORDER ACTIONS</p>
            <h3 className="mt-0.5 text-base font-bold text-slate-900">الإجراءات التفصيلية</h3>
          </div>
          <div className="grid gap-1">
            <Ctr_WorkOrderActions
              variant="card"
              onActionClick={(action) => setActivePopup(action)}
            />
            <button
              type="button"
              className="inline-flex w-full items-center gap-0 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-gradient-to-r hover:from-rose-100 hover:to-orange-100 hover:shadow-[0_10px_18px_-12px_rgba(225,29,72,0.8)]"
              onClick={() => setActivePopup("details")}
            >
              <FileText size={15} />
              <span>عرض التفاصيل المختصرة</span>
            </button>
          </div>
        </article>
      </section>
      <Ctr_WorkOrderActionDialogs
        activePopup={activePopup}
        order={orderData}
        onClose={() => setActivePopup(null)}
      />
    </div>
  );
}
