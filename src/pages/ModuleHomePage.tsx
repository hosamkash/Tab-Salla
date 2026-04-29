import {
  ArrowUpRight,
  Clock3,
  TrendingUp
} from "lucide-react";
import type { AppPageId } from "@/models/navigation";
import { baskets, verificationItems, workOrders } from "@/data/work-orders-data";
import { stageDefinitions } from "@/data/stages-data";

interface ModuleHomePageProps {
  onNavigate: (pageId: AppPageId) => void;
}

const recentActivity = [
  { action: "تحديث بيانات المراحل والسلال", time: "اليوم", type: "إعدادات" },
  { action: "إضافة بنود تحقق جديدة", time: "اليوم", type: "جودة" },
  { action: "مراجعة أوامر متأخرة SLA", time: "اليوم", type: "متابعة" },
  { action: "إعادة إسناد أمر عمل", time: "اليوم", type: "تشغيل" },
];

const monthLabels = ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "أغس", "سبت", "أكت", "نوف", "ديس"];

export function ModuleHomePage({ onNavigate }: ModuleHomePageProps) {
  const totalOrders = workOrders.length;
  const activeOrders = workOrders.filter((item) => item.status !== "مكتمل").length;
  const overdueOrders = workOrders.filter((item) => item.daysInBasket > item.slaDays).length;
  const withinSlaRate = totalOrders === 0 ? 0 : Math.round(((totalOrders - overdueOrders) / totalOrders) * 100);
  const totalOrderValue = workOrders.reduce((sum, item) => sum + item.value, 0);
  const totalBaskets = baskets.length;
  const totalVerificationItems = verificationItems.length;

  const topKpis = [
    { label: "إجمالي أوامر العمل", value: totalOrders.toString(), delta: `${activeOrders} نشط`, tone: "blue" },
    { label: "متأخرة SLA", value: overdueOrders.toString(), delta: `${withinSlaRate}% ضمن SLA`, tone: "teal" },
    { label: "قيمة أوامر العمل", value: `${Math.round(totalOrderValue / 1000)}K`, delta: "قيمة تقديرية", tone: "green" },
    { label: "تعريفات السلال", value: totalBaskets.toString(), delta: `${totalVerificationItems} بند تحقق`, tone: "amber" },
  ];

  const sectionCounts = workOrders.reduce<Record<string, number>>((acc, item) => {
    acc[item.section] = (acc[item.section] ?? 0) + 1;
    return acc;
  }, {});
  const sectionPalette: Record<string, string> = {
    مشاريع: "#0ea5e9",
    تشغيل: "#22c55e",
    جودة: "#f59e0b",
    المساندة: "#6366f1",
  };
  const sectionShares = Object.entries(sectionCounts).map(([label, count]) => ({
    label,
    value: Math.round((count / totalOrders) * 100),
    color: sectionPalette[label] ?? "#64748b",
  }));

  const basketSummary = baskets.map((basket) => {
    const basketOrders = workOrders.filter((order) => order.currentBasket === basket.name);
    const avgDays =
      basketOrders.length === 0
        ? 0
        : Math.round(basketOrders.reduce((sum, order) => sum + order.daysInBasket, 0) / basketOrders.length);
    return {
      label: basket.name,
      share: totalOrders === 0 ? 0 : Math.round((basketOrders.length / totalOrders) * 100),
      value: `${basketOrders.length} أمر`,
      trend: `SLA ${basket.slaDays} - متوسط ${avgDays} يوم`,
    };
  });

  const monthlySeries = monthLabels.map((_, index) => {
    const order = workOrders[index % workOrders.length];
    return 40 + order.daysInBasket * 6;
  });
  const baselineSeries = monthLabels.map((_, index) => {
    const order = workOrders[index % workOrders.length];
    return 35 + order.slaDays * 4;
  });

  const stageSummary = stageDefinitions.slice(0, 5);
  const monthlyWorkJourney = stageSummary.map((stage, index) => ({
    key: stage.id,
    label: stage.nameAr,
    count: `${workOrders.filter((order) => order.currentBasket === stage.nameAr).length}`,
    color: ["purple", "orange", "red", "blue", "green"][index],
    hint: `SLA ${stage.slaDays}`,
  }));

  return (
    <div className="generic-page module-home-v3">
      <section className="module-v3-kpi-grid">
        {topKpis.map((kpi) => (
          <article key={kpi.label} className={`card-surface module-v3-kpi kpi-${kpi.tone}`}>
            <p>{kpi.label}</p>
            <h3>{kpi.value}</h3>
            <small>{kpi.delta}</small>
          </article>
        ))}
      </section>

      <section className="module-v3-analytics-grid">
        <article className="card-surface module-v3-panel">
          <h3>توزيع الأقسام</h3>
          <div className="module-v3-donut-wrap">
            <div className="module-v3-donut" aria-hidden="true">
                <span>{totalOrders}</span>
            </div>
            <div className="module-v3-legend">
              {sectionShares.map((item) => (
                <p key={item.label}>
                  <i style={{ backgroundColor: item.color }} />
                  {item.label} - {item.value}%
                </p>
              ))}
            </div>
          </div>
        </article>

        <article className="card-surface module-v3-panel">
          <h3>ربحية العلامات / السلال</h3>
          <div className="module-v3-tree-grid">
            <div className="tree-a">
              <p>
                <strong>{basketSummary[0]?.label ?? "-"}</strong>
                <small>{basketSummary[0]?.share ?? 0}%</small>
              </p>
              <div className="tree-mini-chart" aria-hidden="true">
                <span style={{ height: "36%" }} />
                <span style={{ height: "54%" }} />
                <span style={{ height: "42%" }} />
                <span style={{ height: "66%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "74%" }} />
              </div>
            </div>
            <div className="tree-b">
              <p>
                <strong>{basketSummary[1]?.label ?? "-"}</strong>
                <small>{basketSummary[1]?.share ?? 0}%</small>
              </p>
            </div>
            <div className="tree-c">
              <p>
                <strong>{basketSummary[2]?.label ?? "-"}</strong>
                <small>{basketSummary[2]?.share ?? 0}%</small>
              </p>
            </div>
            <div className="tree-d">
              <p>
                <strong>{basketSummary[3]?.label ?? "-"}</strong>
                <small>{basketSummary[3]?.share ?? 0}%</small>
              </p>
            </div>
            <div className="tree-e">
              <p>
                <strong>{basketSummary[4]?.label ?? "-"}</strong>
                <small>{basketSummary[4]?.share ?? 0}%</small>
              </p>
            </div>
          </div>
          <div className="module-v3-tree-meta">
            {basketSummary.slice(0, 5).map((item) => (
              <div key={item.label} className="tree-meta-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <em>{item.trend}</em>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="card-surface recent-activity module-home-activity-card">
        <div className="module-v3-row-head">
          <h3>مقارنة الأداء الشهري</h3>
          <button className="module-v3-link-btn" onClick={() => onNavigate("work-orders")}>
            <span>عرض أوامر العمل</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="module-v3-lines-meta">
          <div className="line-meta-item">
            <i className="line-dot main" />
            <span>العام الحالي</span>
            <strong>{monthlySeries[11]}</strong>
          </div>
          <div className="line-meta-item">
            <i className="line-dot sub" />
            <span>العام السابق</span>
            <strong>{baselineSeries[11]}</strong>
          </div>
          <div className="line-meta-item delta">
            <span>معدل التحسن</span>
            <strong>+{Math.round(((monthlySeries[11] - baselineSeries[11]) / baselineSeries[11]) * 100)}%</strong>
          </div>
        </div>
        <div className="module-v3-lines">
          <div className="line-grid" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="line-svg line-main-svg" aria-hidden="true">
            <polyline
              points={monthlySeries.map((value, index) => `${(index / 11) * 100},${100 - value}`).join(" ")}
            />
          </svg>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="line-svg line-sub-svg" aria-hidden="true">
            <polyline
              points={baselineSeries.map((value, index) => `${(index / 11) * 100},${100 - value}`).join(" ")}
            />
          </svg>
          <div className="line-points">
            {monthlySeries.map((value, index) => (
              <span key={`main-${index}`} style={{ left: `${(index / 11) * 100}%`, bottom: `${value}%` }} />
            ))}
          </div>
          <div className="line-points secondary">
            {baselineSeries.map((value, index) => (
              <span key={`base-${index}`} style={{ left: `${(index / 11) * 100}%`, bottom: `${value}%` }} />
            ))}
          </div>
        </div>
        <div className="module-v3-month-axis">
          {monthLabels.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </section>

      <section className="module-v3-bottom-grid">
        <article className="card-surface module-v3-panel">
          <h3>حجم الأعمال حسب الشهر</h3>
          <div className="module-v3-journey">
            <span className="journey-path" aria-hidden="true" />
            {monthlyWorkJourney.map((item, index) => (
              <article
                key={item.key}
                className={`journey-node ${item.color} ${index % 2 === 1 ? "down" : ""}`}
              >
                <small>{item.hint}</small>
                <strong>{item.label}</strong>
                <p>{item.count} أمر</p>
              </article>
            ))}
          </div>
        </article>

        <article className="card-surface module-v3-panel">
          <h3>
            <TrendingUp size={18} /> النشاط الأخير
          </h3>
          {recentActivity.map((item) => (
            <div key={`${item.action}-${item.time}`} className="activity-row module-home-activity-row">
              <div>
                <p>{item.action}</p>
                <small>
                  <Clock3 size={12} />
                  {item.time}
                </small>
              </div>
              <span>{item.type}</span>
            </div>
          ))}
        </article>
      </section>
    </div>
  );
}
