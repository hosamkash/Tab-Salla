import { LayoutGrid, TrendingUp } from "lucide-react";
import { navGroups } from "@/data/navigation-data";
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

export function ModuleHomePage({ onNavigate }: ModuleHomePageProps) {
  const quickAccessItems = navGroups.flatMap((group) => group.items);

  return (
    <div className="generic-page">
      <section className="card-surface module-welcome">
        <h2>مرحبًا بك في موديول سلال أوامر العمل</h2>
        <p>اختر الشاشة التي تريد إدارتها وابدأ تنفيذ إجراءات سير العمل.</p>
      </section>

      <section className="master-grid">
        {quickAccessItems.map((item) => (
          <article key={item.id} className="master-card card-surface">
            <LayoutGrid size={30} />
            <h3>{item.label}</h3>
            <p>الوصول السريع إلى شاشة {item.label}</p>
            <button className="btn btn-primary" onClick={() => onNavigate(item.id)}>
              فتح الشاشة
            </button>
          </article>
        ))}
      </section>

      <section className="card-surface recent-activity">
        <h3>
          <TrendingUp size={18} /> النشاط الأخير
        </h3>
        {recentActivity.map((item) => (
          <div key={`${item.action}-${item.time}`} className="activity-row">
            <div>
              <p>{item.action}</p>
              <small>{item.time}</small>
            </div>
            <span>{item.type}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
