import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRightLeft,
  BriefcaseBusiness,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Search,
  SendHorizontal,
  UserRound,
} from "lucide-react";
import {
  baskets,
  employeeOptions,
  kpiCards,
  movementTimeline,
  verificationItems,
  workOrders,
} from "@/data/work-orders-data";
import { CtrDropdownSearch, type SearchOption } from "@/components/core/CtrDropdownSearch";
import type { WorkOrder } from "@/models/work-order";

type PopupType =
  | "verify"
  | "forward"
  | "return"
  | "details"
  | "timeline"
  | "reassign"
  | "complete-request"
  | "complete-response"
  | "attachments"
  | "notes"
  | null;

interface WorkOrdersPageProps {
  onOpenDetailsPage: (order: WorkOrder | null) => void;
}

export function WorkOrdersPage({ onOpenDetailsPage }: WorkOrdersPageProps) {
  const verificationBasketName = "سلة تنفيذ الأعمال المدنية";
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder>(workOrders[0]);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>(["v1"]);
  const [basketFilter, setBasketFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [sectionFilter, setSectionFilter] = useState("كل الأقسام");
  const [forwardBasket, setForwardBasket] = useState("سلة جودة المرفقات");
  const [searchText, setSearchText] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

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
  const forwardBasketOptions: SearchOption[] = baskets.map((basket) => ({
    id: `forward-${basket.id}`,
    value: basket.name,
    label: basket.name,
  }));

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

  const selectedVerificationItems = verificationItems.filter(
    (item) => item.basket === verificationBasketName,
  );

  const mandatoryUnchecked = selectedVerificationItems.some(
    (item) => item.mandatory && !selectedChecklist.includes(item.id),
  );

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
                        {/* التحقق */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("verify");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <CheckCheck size={15} />
                          <span>التحقق</span>
                        </button>

                        {/* تأكيد و ترحيل */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("forward");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <SendHorizontal size={15} />
                          <span>تأكيد و ترحيل</span>
                        </button>
                        
                        {/* إرجاع */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("return");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>إرجاع</span>
                        </button>

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
                        
                        {/* سجل التحركات */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("timeline");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <ArrowRightLeft size={15} />
                          <span>سجل التحركات</span>
                        </button>

                        {/* إعادة إسناد */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("reassign");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>إعادة إسناد</span>
                        </button>
 
                        {/* طلب استكمال */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("complete-request");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>طلب استكمال</span>
                        </button>

                        {/* الرد على الاستكمال */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("complete-response");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>الرد على الاستكمال</span>
                        </button>

                        {/* قائمة المرفقات */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("attachments");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>قائمة المرفقات</span>
                        </button>

                        {/* ملاحظات */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setActivePopup("notes");
                            setOpenActionMenuId(null);
                          }}
                        >
                          <UserRound size={15} />
                          <span>ملاحظات</span>
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

      {/* المودالات */}
      {activePopup ? (
        <div className="modal-backdrop" onClick={() => setActivePopup(null)}>
          <div className="modal card-surface" onClick={(event) => event.stopPropagation()}>
            {/* ديالوج التحقق */}
            {activePopup === "verify" ? (
              <>
                <h3 className="dialog-header-title">بنود التحقق - سلة: {verificationBasketName}</h3>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedChecklist.length === selectedVerificationItems.length}
                    onChange={(event) =>
                      setSelectedChecklist(
                        event.target.checked ? selectedVerificationItems.map((item) => item.id) : [],
                      )
                    }
                  />
                  تحديد الكل
                </label>
                <div className="checklist">
                  {selectedVerificationItems.map((item) => (
                    <label key={item.id} className={item.mandatory ? "checkbox-row mandatory" : "checkbox-row"}>
                      <input
                        type="checkbox"
                        checked={selectedChecklist.includes(item.id)}
                        onChange={(event) =>
                          setSelectedChecklist((prev) =>
                            event.target.checked
                              ? [...prev, item.id]
                              : prev.filter((savedId) => savedId !== item.id),
                          )
                        }
                      />
                      <div>
                        <p>{item.title}</p>
                        <small>{item.description}</small>
                      </div>
                      {item.mandatory ? <span className="star">*</span> : null}
                    </label>
                  ))}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setActivePopup(null)}>
                    إلغاء
                  </button>
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    حفظ التحقق
                  </button>
                </div>
              </>
            ) : null}

            {/* ديالوج الترحيل */}
            {activePopup === "forward" ? (
              <>
                <h3 className="dialog-header-title">تأكيد وترحيل - {selectedOrder.workOrderNumber}</h3>
                {mandatoryUnchecked ? (
                  <p className="warning-line">
                    <AlertTriangle size={16} /> توجد بنود إلزامية غير مكتملة.
                  </p>
                ) : null}
                <div className="forward-dialog-grid">
              
                  {/* ملاحظات الترحيل */}
                  <div className="forward-col">
                    <label className="field-label">ملاحظات الترحيل</label>
                    <textarea
                      className="forward-notes text-xs"
                      rows={10}
                      defaultValue="تم استكمال متطلبات المرحلة الحالية."
                    />
                  </div>
                      {/* ترحيل إلى سلة */}
                      <div className="forward-col">
                    <label className="field-label">ترحيل إلى سلة</label>
                    <div className="forward-basket-list">
                      {forwardBasketOptions.map((basket) => (
                        <label
                          key={basket.id}
                          className={forwardBasket === basket.value ? "forward-basket-item active" : "forward-basket-item"}
                        >
                          <input
                            type="radio"
                            name="forward-basket"
                            checked={forwardBasket === basket.value}
                            onChange={() => setForwardBasket(basket.value)}
                          />
                          <span>{basket.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    ترحيل الآن
                  </button>
                </div>
              </>
            ) : null}

            {/* ديالوج التاريخ */}
            {activePopup === "timeline" ? (
              <>
                <h3 className="dialog-header-title">سجل التحركات - {selectedOrder.workOrderNumber}</h3>
                <div className="timeline">
                  {movementTimeline.map((item) => (
                    <div key={item.id} className="timeline-item">
                      <div className="dot" />
                      <div>
                        <p className="timeline-title">
                          {item.date} - تم الترحيل من {item.fromBasket} إلى {item.toBasket}
                        </p>
                        <small>
                          بواسطة {item.user} - {item.note}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {activePopup === "return" ? (
              <>
                <h3 className="dialog-header-title">إرجاع - {selectedOrder.workOrderNumber}</h3>
                <label className="field-label">إرجاع إلى سلة</label>
                <div className="forward-basket-list">
                  {forwardBasketOptions.map((basket) => (
                    <label
                      key={`return-${basket.id}`}
                      className={forwardBasket === basket.value ? "forward-basket-item active" : "forward-basket-item"}
                    >
                      <input
                        type="radio"
                        name="return-basket"
                        checked={forwardBasket === basket.value}
                        onChange={() => setForwardBasket(basket.value)}
                      />
                      <span>{basket.label}</span>
                    </label>
                  ))}
                </div>
                <label className="field-label">سبب الإرجاع</label>
                <textarea className="forward-notes text-xs" rows={4} defaultValue="يرجى استكمال متطلبات المرحلة الحالية." />
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    تأكيد الإرجاع
                  </button>
                </div>
              </>
            ) : null}

            {activePopup === "details" ? (
              <>
                <h3 className="dialog-header-title">عرض التفاصيل - {selectedOrder.workOrderNumber}</h3>
                <div className="employees-list">
                  <div className="employee-row">
                    <strong>رقم الأمر:</strong>
                    <span>{selectedOrder.workOrderNumber}</span>
                  </div>
                  <div className="employee-row">
                    <strong>السلة الحالية:</strong>
                    <span>{selectedOrder.currentBasket}</span>
                  </div>
                  <div className="employee-row">
                    <strong>القسم/النوع:</strong>
                    <span>
                      {selectedOrder.section} - {selectedOrder.type}
                    </span>
                  </div>
                  <div className="employee-row">
                    <strong>المسؤول:</strong>
                    <span>{selectedOrder.ownerName}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    إغلاق
                  </button>
                </div>
              </>
            ) : null}

            {/* ديالوج الإعادة إسناد */}
            {activePopup === "reassign" ? (
              <>
                <h3 className="dialog-header-title">إعادة إسناد - {selectedOrder.workOrderNumber}</h3>
                <div className="search-wrap">
                  <Search size={16} />
                  <input placeholder="ابحث عن موظف" />
                </div>
                <div className="employees-list">
                  {employeeOptions.map((employee) => (
                    <label key={employee.id} className="employee-row">
                      <input type="radio" name="employee" />
                      <span className="avatar">{employee.initials}</span>
                      <div>
                        <p>{employee.name}</p>
                        <small>{employee.role}</small>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    إسناد
                  </button>
                </div>
              </>
            ) : null}

            {activePopup === "complete-request" ? (
              <>
                <h3 className="dialog-header-title">طلب استكمال - {selectedOrder.workOrderNumber}</h3>
                <label className="field-label">نص طلب الاستكمال</label>
                <textarea
                  className="forward-notes text-xs"
                  rows={5}
                  defaultValue="يرجى استكمال البيانات الناقصة وإعادة رفع المرفقات المطلوبة."
                />
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    إرسال الطلب
                  </button>
                </div>
              </>
            ) : null}

            {activePopup === "complete-response" ? (
              <>
                <h3 className="dialog-header-title">الرد على الاستكمال - {selectedOrder.workOrderNumber}</h3>
                <label className="field-label">تفاصيل الرد</label>
                <textarea
                  className="forward-notes text-xs"
                  rows={5}
                  defaultValue="تم استكمال المتطلبات وإرفاق جميع المستندات."
                />
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    حفظ الرد
                  </button>
                </div>
              </>
            ) : null}

            {activePopup === "attachments" ? (
              <>
                <h3 className="dialog-header-title">قائمة المرفقات - {selectedOrder.workOrderNumber}</h3>
                <div className="employees-list">
                  <div className="employee-row">
                    <span>مخطط المسار.pdf</span>
                    <small>2.3 MB</small>
                  </div>
                  <div className="employee-row">
                    <span>صور الموقع قبل التنفيذ.zip</span>
                    <small>8.1 MB</small>
                  </div>
                  <div className="employee-row">
                    <span>اعتماد التصريح.jpg</span>
                    <small>1.2 MB</small>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    إغلاق
                  </button>
                </div>
              </>
            ) : null}

            {activePopup === "notes" ? (
              <>
                <h3 className="dialog-header-title">ملاحظات - {selectedOrder.workOrderNumber}</h3>
                <textarea
                  className="forward-notes text-xs"
                  rows={6}
                  defaultValue="تمت معاينة الموقع ميدانيًا، وهناك حاجة لمراجعة مسار الكابلات قبل الإغلاق النهائي."
                />
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => setActivePopup(null)}>
                    حفظ الملاحظة
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
