import { Palette } from "lucide-react";
import { PageIntroHeader } from "@/components/PageIntroHeader";
import type { AppPageId } from "@/models/navigation";

interface DesignSystemPageProps {
  onNavigate: (pageId: AppPageId) => void;
}

export function DesignSystemPage({ onNavigate }: DesignSystemPageProps) {
  return (
    <div className="generic-page">
      <PageIntroHeader
        title="Design System"
        description="صفحة مرجعية لعناصر الهوية البصرية والمكونات القياسية."
        icon={<Palette size={18} />}
        actions={
          <button className="btn btn-secondary" onClick={() => onNavigate("module-home")}>
            العودة للرئيسية
          </button>
        }
      />
      <section className="card-surface p-4">
        <p className="text-sm text-slate-600">
          محتوى صفحة الـ Design System سيتم استكماله لاحقًا.
        </p>
      </section>
    </div>
  );
}
