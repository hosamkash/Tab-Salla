import {
  ArrowUpRight,
  Clock3,
  TrendingUp
} from "lucide-react";
import type { AppPageId } from "@/models/navigation";

interface ModuleHomePageProps {
  onNavigate: (pageId: AppPageId) => void;
}

const recentActivity = [
  { action: "تم تحديث بنود التحقق لسلة التنفيذ", time: "منذ ساعة", type: "تحديث" },
  { action: "إضافة سلة جديدة (المساندة الفنية)", time: "منذ 3 ساعات", type: "إضافة" },
  { action: "تعديل SLA لسلة التصاريح", time: "منذ 6 ساعات", type: "تحديث" },
  { action: "إعادة إسناد أمر عمل WO-2026-1031", time: "منذ يوم", type: "تشغيل" },
];

const topKpis = [
  { label: "إجمالي أوامر العمل", value: "1,061", delta: "+14.61%", tone: "blue" },
  { label: "أوامر جديدة", value: "10,719", delta: "+11.21%", tone: "teal" },
  { label: "قيمة الأعمال", value: "192.13M", delta: "+4.43%", tone: "green" },
  { label: "رضا المستفيد", value: "93.13%", delta: "+6.12%", tone: "amber" },
];

const sectionShares = [
  { label: "مشاريع", value: 42, color: "#0ea5e9" },
  { label: "تشغيل", value: 31, color: "#22c55e" },
  { label: "جودة", value: 17, color: "#f59e0b" },
  { label: "مساندة", value: 10, color: "#6366f1" },
];

const monthlySeries = [42, 48, 45, 62, 66, 70, 84, 88, 92, 97, 101, 108];
const baselineSeries = [38, 40, 39, 41, 44, 46, 47, 51, 55, 59, 60, 66];
const monthLabels = ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "أغس", "سبت", "أكت", "نوف", "ديس"];

const basketProfitability = [
  { label: "سلة مشاريع", share: 31, value: "56.4M", trend: "+8.2%" },
  { label: "سلة تشغيل", share: 24, value: "42.8M", trend: "+5.1%" },
  { label: "سلة جودة", share: 19, value: "33.1M", trend: "+3.7%" },
  { label: "سلة تصاريح", share: 14, value: "24.6M", trend: "+2.3%" },
  { label: "سلة ميدانية", share: 12, value: "20.2M", trend: "+1.9%" },
];

const monthlyWorkJourney = [
  { key: "capture", label: "استقبال الطلبات", count: "148", color: "purple", hint: "يناير" },
  { key: "planning", label: "التخطيط", count: "126", color: "orange", hint: "فبراير" },
  { key: "execution", label: "التنفيذ", count: "172", color: "red", hint: "مارس" },
  { key: "control", label: "التحقق والجودة", count: "139", color: "blue", hint: "أبريل" },
  { key: "closure", label: "الإغلاق", count: "117", color: "green", hint: "مايو" },
];

export function ModuleHomePage({ onNavigate }: ModuleHomePageProps) {
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
              <span>1.1B</span>
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
                <strong>{basketProfitability[0].label}</strong>
                <small>{basketProfitability[0].share}%</small>
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
                <strong>{basketProfitability[1].label}</strong>
                <small>{basketProfitability[1].share}%</small>
              </p>
            </div>
            <div className="tree-c">
              <p>
                <strong>{basketProfitability[2].label}</strong>
                <small>{basketProfitability[2].share}%</small>
              </p>
            </div>
            <div className="tree-d">
              <p>
                <strong>{basketProfitability[3].label}</strong>
                <small>{basketProfitability[3].share}%</small>
              </p>
            </div>
            <div className="tree-e">
              <p>
                <strong>{basketProfitability[4].label}</strong>
                <small>{basketProfitability[4].share}%</small>
              </p>
            </div>
          </div>
          <div className="module-v3-tree-meta">
            {basketProfitability.map((item) => (
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
