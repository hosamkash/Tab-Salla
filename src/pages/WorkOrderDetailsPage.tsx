import { ArrowRight, FileText, MessageSquare, RefreshCcw, Route, UserCheck } from "lucide-react";
import type { WorkOrder } from "@/models/work-order";
import { PageIntroHeader } from "@/components/PageIntroHeader";

interface WorkOrderDetailsPageProps {
  order: WorkOrder | null;
  onBack: () => void;
}

export function WorkOrderDetailsPage({ order, onBack }: WorkOrderDetailsPageProps) {
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
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.status} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">تاريخ الحالة</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.createdAt} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">تاريخ الانتهاء</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue="2026-05-05" />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">القسم الرئيسي</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.section} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">القسم الفرعي</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue="أعمال ميدانية" />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">النوع</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.type} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">المسؤول</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.ownerName} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">قيمة أمر العمل</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.value.toLocaleString("en-US")} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">الاستشاري</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue="الاستشاري الهندسي" />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">السلة الحالية</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={orderData.currentBasket} />
            </label>
            <label>
              <span className="mb-1 block text-xs text-slate-500">أيام التواجد بالسلة</span>
              <input className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue={`${orderData.daysInBasket} / ${orderData.slaDays}`} />
            </label>
          </div>
        </article>

        <article className="card-surface rounded-2xl p-4">
          <h3 className="mb-4 text-base font-semibold text-slate-900">الإجراءات التفصيلية</h3>
          <div className="grid gap-2">
            <button type="button" className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <Route size={16} />
              <span>سجل التحركات</span>
            </button>
            <button type="button" className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <UserCheck size={16} />
              <span>إعادة إسناد</span>
            </button>
            <button type="button" className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <RefreshCcw size={16} />
              <span>طلب استكمال</span>
            </button>
            <button type="button" className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <RefreshCcw size={16} />
              <span>الرد على الاستكمال</span>
            </button>
            <button type="button" className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <FileText size={16} />
              <span>قائمة المرفقات</span>
            </button>
            <button type="button" className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <MessageSquare size={16} />
              <span>ملاحظات</span>
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
