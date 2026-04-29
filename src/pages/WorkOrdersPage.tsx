import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Search,
  UserRound,
} from "lucide-react";
import {
  baskets,
  kpiCards,
  workOrders,
} from "@/data/work-orders-data";
import { CtrDropdownSearch, type SearchOption } from "@/components/core/CtrDropdownSearch";
import type { WorkOrder } from "@/models/work-order";
import { Ctr_WorkOrderActionDialogs } from "@/pages/components/Ctr_WorkOrderActionDialogs";
import {
  Ctr_WorkOrderActions,
  type WorkOrderPopupType,
} from "@/pages/components/Ctr_WorkOrderActions";

interface WorkOrdersPageProps {
  onOpenDetailsPage: (order: WorkOrder | null) => void;
}

export function WorkOrdersPage({ onOpenDetailsPage }: WorkOrdersPageProps) {
  const [activePopup, setActivePopup] = useState<WorkOrderPopupType>(null);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder>(workOrders[0]);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [basketFilter, setBasketFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [sectionFilter, setSectionFilter] = useState("كل الأقسام");
  const [searchText, setSearchText] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (!openActionMenuId) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(".actions-combo")) return;
      setOpenActionMenuId(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openActionMenuId]);

  const basketOptions: SearchOption[] = [
    { id: "all-baskets", value: "الكل", label: "الكل" },
    ...baskets.map((basket) => ({ id: basket.id, value: basket.name, label: basket.name })),
  ];
  const statusOptions: SearchOption[] = [
    { id: "status-all", value: "الكل", label: "الكل" },
    { id: "status-in-progress", value: "قيد التنفيذ", label: "قيد التنفيذ" },
    { id: "status-overdue", value: "متأخر", label: "متأخر" },
    { id: "status-review", value: "قيد المراجعة", label: "قيد المراجعة" },
    { id: "status-done", value: "مكتمل", label: "مكتمل" },
  ];
  const sectionOptions: SearchOption[] = [
    { id: "section-all", value: "كل الأقسام", label: "كل الأقسام" },
    { id: "section-projects", value: "مشاريع", label: "مشاريع" },
    { id: "section-operations", value: "تشغيل", label: "تشغيل" },
    { id: "section-quality", value: "جودة", label: "جودة" },
  ];
  const filteredOrders = useMemo(() => {
    return workOrders.filter((order) => {
      const basketMatch = basketFilter === "الكل" || order.currentBasket === basketFilter;
      const statusMatch = statusFilter === "الكل" || order.status === statusFilter;
      const sectionMatch = sectionFilter === "كل الأقسام" || order.section === sectionFilter;
      const searchMatch =
        order.workOrderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        order.section.includes(searchText) ||
        order.type.includes(searchText);
      return basketMatch && statusMatch && sectionMatch && searchMatch;
    });
  }, [basketFilter, statusFilter, sectionFilter, searchText]);

  return (
    <div className="work-orders-page">
      <header className="page-header card-surface">
        <div className="orders-header-title">
          <span className="orders-header-icon">
            <BriefcaseBusiness size={18} />
          </span>
          <div>
          <p className="breadcrumb">الرئيسية / أوامر العمل</p>
          <h1>أوامر العمل</h1>
          <p className="sub-title">متابعة دورة حياة أمر العمل عبر السلال وإدارة الإجراءات التشغيلية.</p>
          </div>
        </div>
        <button
          className="btn btn-primary orders-create-btn"
          type="button"
          onClick={() => onOpenDetailsPage(null)}
        >
          إنشاء أمر عمل
        </button>
      </header>

      {/* قيم الأداء */}
      <section className="kpi-grid">
        {kpiCards.map((kpi, index) => (
          <article key={kpi.label} className={`kpi-card card-surface chart-theme-${index + 1}`}>
            <p className="kpi-label">{kpi.label}</p>
            <h3 className="kpi-value">{kpi.value}</h3>
            <span className={kpi.trendUp ? "trend up" : "trend down"}>{kpi.trend}</span>
            {index === 0 ? (
              <div className="kpi-visual visual-line" aria-hidden="true">
                <span className="dot d1" />
                <span className="dot d2" />
                <span className="dot d3" />
                <span className="dot d4" />
              </div>
            ) : null}
            {index === 1 ? (
              <div className="kpi-visual visual-donut" aria-hidden="true">
                <span className="donut-center" />
              </div>
            ) : null}
            {index === 2 ? (
              <div className="kpi-visual visual-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            ) : null}
            {index === 3 ? (
              <div className="kpi-visual visual-wave" aria-hidden="true">
                <span />
              </div>
            ) : null}
          </article>
        ))}
      </section>

      {/* فلترة الأوامر */}
      <section className="filters-bar card-surface">
        {/* فلترة السلة */}
        <CtrDropdownSearch
          data={basketOptions}
          value={basketFilter}
          onValueChange={setBasketFilter}
          placeholder="اختر السلة"
          searchPlaceholder="ابحث عن سلة"
          width="100%"
          matchTriggerWidth
          triggerClassName="h-9 text-xs"
          showCheckIcon={false}
        />
        {/* فلترة الحالة */}
        <CtrDropdownSearch
          data={statusOptions}
          value={statusFilter}
          onValueChange={setStatusFilter}
          placeholder="اختر الحالة"
          searchPlaceholder="ابحث عن حالة"
          width="100%"
          matchTriggerWidth
          triggerClassName="h-9 text-xs"
          showCheckIcon={false}
        />
        {/* فلترة القسم */}
        <CtrDropdownSearch
          data={sectionOptions}
          value={sectionFilter}
          onValueChange={setSectionFilter}
          placeholder="اختر القسم"
          searchPlaceholder="ابحث عن قسم"
          width="100%"
          matchTriggerWidth
          triggerClassName="h-9 text-xs"
          showCheckIcon={false}
        />
        {/* فلترة التاريخ المن */}
        <input type="date" />
        {/* فلترة التاريخ الإلى */}
        <input type="date" />
        {/* فلترة البحث */}
        <div className="search-wrap">
          <Search size={16} />
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="بحث برقم الأمر أو النوع"
          />
        </div>
        {/* فلترة التطبيق */}
        <button className="btn btn-secondary">تطبيق</button>
      </section>

      {/* جدول أوامر العمل */}
      <section className="table-card card-surface">
        {/* عنوان الجدول */}
        <table>
          <thead>
            <tr>
              <th className="col-days">أيام التواجد</th>
              <th className="col-order-no">رقم الأمر</th>
              <th>التاريخ</th>
              <th>القسم</th>
              <th>النوع</th>
              <th>الحالة</th>
              <th>المسؤول</th>
              <th>القيمة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const ratio = Math.min((order.daysInBasket / order.slaDays) * 100, 120);
              const overdue = order.daysInBasket > order.slaDays;
              const isHighlighted = hoveredRowId === order.id;
              return (
                <tr
                  key={order.id}
                  className={isHighlighted || overdue ? "row-overdue" : ""}
                  onMouseEnter={() => setHoveredRowId(order.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <td className="col-days">
                    <div className="days-cell">
                      <div className="days-info">
                        <Clock3 size={14} />
                        <span>
                          {order.daysInBasket} / {order.slaDays} أيام
                        </span>
                        {overdue ? <AlertTriangle size={14} className="alert-icon" /> : null}
                      </div>
                      <div className="sla-track">
                        <div className="sla-fill" style={{ width: `${ratio}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="col-order-no">{order.workOrderNumber}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.section}</td>
                  <td>{order.type}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>{order.status}</span>
                  </td>
                  <td>
                    <div className="owner-cell">
                      <span className="avatar">{order.ownerInitials}</span>
                      <span>{order.ownerName}</span>
                    </div>
                  </td>
                  <td>{order.value.toLocaleString("en-US")} ر.س</td>
                  <td>
                    <details
                      className="actions-combo"
                      open={openActionMenuId === order.id}
                      onToggle={(event) => {
                        const isOpen = (event.currentTarget as HTMLDetailsElement).open;
                        setOpenActionMenuId(isOpen ? order.id : null);
                      }}
                    >
                      <summary className="actions-combo-trigger">
                        <MoreHorizontal size={16} />
                        <span>الإجراءات</span>
                      </summary>
                      <div className="actions-combo-menu">
                        <Ctr_WorkOrderActions
                          onActionClick={(action) => {
                            setSelectedOrder(order);
                            setActivePopup(action);
                            setOpenActionMenuId(null);
                          }}
                        />

                        {/* عرض التفاصيل */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            onOpenDetailsPage(order);
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>عرض التفاصيل</span>
                        </button>
                      </div>
                    </details>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button>
            <ChevronRight size={16} />
          </button>
          <span>1</span>
          <span className="active">2</span>
          <span>3</span>
          <button>
            <ChevronLeft size={16} />
          </button>
        </div>
      </section>

      <Ctr_WorkOrderActionDialogs
        activePopup={activePopup}
        order={selectedOrder}
        onClose={() => setActivePopup(null)}
      />
    </div>
  );
}
