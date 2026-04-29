import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  FolderCog,
  Layers,
  Network,
  ShieldCheck,
} from "lucide-react";
import type { AppPageId } from "@/models/navigation";

interface MasterDataDashboardPageProps {
  onNavigate: (pageId: AppPageId) => void;
}

const cards: { id: AppPageId; title: string; description: string; icon: typeof Layers }[] = [
  { id: "stages", title: "المراحل (الأساسية)", description: "إدارة المراحل وتشمل إعدادات السلال", icon: Layers },
  { id: "states", title: "تعريف الحالة", description: "إعداد حالات سير الطلب", icon: BadgeCheck },
  { id: "sections", title: "الأقسام", description: "تعريف الأقسام الرئيسية", icon: Building2 },
  { id: "sub-sections", title: "الأقسام الفرعية", description: "ربط الأقسام بمسارات العمل", icon: Network },
  { id: "types", title: "أنواع أوامر العمل", description: "تصنيف الطلبات التشغيلية", icon: FolderCog },
  { id: "owners", title: "المسؤولين", description: "إدارة المستخدمين المخولين", icon: BriefcaseBusiness },
  {
    id: "verification-items",
    title: "بنود التحقق",
    description: "تعريف بنود الجودة والتحقق",
    icon: ShieldCheck,
  },
];

export function MasterDataDashboardPage({ onNavigate }: MasterDataDashboardPageProps) {
  return (
    <div className="generic-page">
      <header className="page-header card-surface">
        <div>
          <p className="breadcrumb">الرئيسية / الإعدادات</p>
          <h1>لوحة تحكم الإعدادات</h1>
          <p className="sub-title">شاشات Master Data الرئيسية لتنظيم السلال والإجراءات.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => onNavigate("work-orders")}>
          العودة لأوامر العمل
        </button>
      </header>

      <section className="master-grid">
        {cards.map((card) => (
          <article key={card.title} className="master-card card-surface">
            <card.icon size={30} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button className="btn btn-primary" onClick={() => onNavigate(card.id)}>
              إدارة
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
