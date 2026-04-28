import { Clock3, ShieldCheck, TriangleAlert } from "lucide-react";
import type { AppPageId } from "@/models/navigation";

interface DesignSystemPageProps {
  onNavigate: (pageId: AppPageId) => void;
}

export function DesignSystemPage({ onNavigate }: DesignSystemPageProps) {
  return (
    <div className="generic-page">
      <header className="page-header card-surface">
        <div>
          <p className="breadcrumb">الرئيسية / Design System</p>
          <h1>Design System</h1>
          <p className="sub-title">هوية TAB ERP المعتمدة لاستخدامها في جميع الشاشات.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => onNavigate("work-orders")}>
          العودة لأوامر العمل
        </button>
      </header>

      <section className="card-surface">
        <h3>ألوان النظام</h3>
        <div className="token-grid">
          <div className="token">
            <span style={{ background: "#C8102E" }} />
            <p>TAB Red</p>
            <small>#C8102E</small>
          </div>
          <div className="token">
            <span style={{ background: "#12B76A" }} />
            <p>Success</p>
            <small>#12B76A</small>
          </div>
          <div className="token">
            <span style={{ background: "#F79009" }} />
            <p>Warning</p>
            <small>#F79009</small>
          </div>
          <div className="token">
            <span style={{ background: "#D92D20" }} />
            <p>Error</p>
            <small>#D92D20</small>
          </div>
        </div>
      </section>

      <section className="card-surface">
        <h3>Components أساسية</h3>
        <div className="component-row">
          <span className="status-badge قيد التنفيذ">قيد التنفيذ</span>
          <span className="status-badge متأخر">متأخر</span>
          <span className="status-badge مكتمل">مكتمل</span>
        </div>
        <div className="component-row">
          <div className="demo-progress">
            <Clock3 size={14} />
            <div className="sla-track">
              <div className="sla-fill" style={{ width: "94%" }} />
            </div>
          </div>
        </div>
        <div className="component-row icon-row">
          <div className="icon-pill">
            <ShieldCheck size={16} /> تحقق
          </div>
          <div className="icon-pill warning">
            <TriangleAlert size={16} /> تنبيه SLA
          </div>
        </div>
      </section>
    </div>
  );
}
