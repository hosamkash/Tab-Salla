import { useState } from "react";
import type React from "react";
import {
  Blocks,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardList,
  FolderCog,
  GitBranch,
  Grid3X3,
  Home,
  LayoutDashboard,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  UsersRound,
} from "lucide-react";
import logoPath from "../../docs/Logo.png";
import {
  dashboardNavItem,
  navGroups,
  pageMetaMap,
} from "@/data/navigation-data";
import type { AppPageId } from "@/models/navigation";

interface ModuleLayoutProps {
  currentPage: AppPageId;
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
  onNavigate: (pageId: AppPageId) => void;
}

export function ModuleLayout({
  currentPage,
  children,
  onNavigate,
}: ModuleLayoutProps) {
  const fixedHeaderMeta = pageMetaMap["module-home"];
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openNavGroups, setOpenNavGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      navGroups.map((group) => [
        group.id,
        group.id === "workflows" || group.items.some((item) => item.id === currentPage),
      ]),
    ),
  );
  const getGroupIcon = (groupId: string) => {
    if (groupId === "settings")
      return <Settings2 size={14} className="group-icon settings" />;
    return <BriefcaseBusiness size={14} className="group-icon workflows" />;
  };

  const getNavItemIcon = (pageId: AppPageId) => {
    switch (pageId) {
      case "module-home":
        return <LayoutDashboard size={14} className="item-icon dashboard" />;
      case "work-orders":
      case "work-order-details":
        return <ClipboardList size={14} className="item-icon work-orders" />;
      case "design-system":
        return <Blocks size={14} className="item-icon design-system" />;
      case "master-data":
        return <FolderCog size={14} className="item-icon master-data" />;
      case "states":
      case "types":
        return <SlidersHorizontal size={14} className="item-icon states" />;
      case "sections":
      case "sub-sections":
      case "paths":
      case "stages":
        return <GitBranch size={14} className="item-icon sections" />;
      case "owners":
        return <UsersRound size={14} className="item-icon owners" />;
      case "verification-items":
        return <ShieldCheck size={14} className="item-icon verification" />;
      case "basket-definition":
        return <Grid3X3 size={14} className="item-icon basket" />;
      default:
        return <Home size={14} className="item-icon dashboard" />;
    }
  };

  return (
    <main className="module-layout">
      <header className="module-topbar">
        <div className="topbar-brand">
          {/* الرئيسية */}
          <button
            onClick={() => onNavigate("module-home")}
            type="button"
            aria-label="الانتقال إلى الرئيسية"
          >
            <Home size={20} />
            <span>الرئيسية</span>
          </button>

          <div></div>
          {/* العنوان والوصف */}
          <div>
            <p className="topbar-brand-title">{fixedHeaderMeta.title}</p>
            <p className="topbar-brand-subtitle">
              {fixedHeaderMeta.description}
            </p>
          </div>
          <img src={logoPath} alt="TAB ERP" className="topbar-logo-icon" />
        </div>

        {/* بيانات المستخدم */}
        <div className="topbar-actions">
          <button
            className="topbar-link-btn"
            type="button"
            aria-label="لوحة المستخدم"
          >
            <span className="topbar-user-avatar text-white">
              <UserRound size={14} className="text-white" />
            </span>
            <span>
              <strong className="text-white">حسام قش</strong>
            </span>
          </button>

          <button
            className="topbar-link-btn logout"
            type="button"
            aria-label="تسجيل الخروج"
          >
            <LogOut size={15} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </header>

      <div className={isSidebarCollapsed ? "module-body sidebar-collapsed" : "module-body"}>
        <aside className={isSidebarCollapsed ? "sidebar card-surface collapsed" : "sidebar card-surface"}>
          <div className="sidebar-head">
            <button
              className="sidebar-toggle"
              type="button"
              aria-label={isSidebarCollapsed ? "فتح القائمة الجانبية" : "طي القائمة الجانبية"}
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            >
              {isSidebarCollapsed ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
            </button>
            <img src={logoPath} alt="TAB ERP" className="brand-logo size-8" />
          </div>
          <nav>
            <button
              className={
                currentPage === dashboardNavItem.id
                  ? "nav-item dashboard-nav-item active"
                  : "nav-item dashboard-nav-item"
              }
              onClick={() => onNavigate(dashboardNavItem.id)}
              type="button"
            >
              {getNavItemIcon(dashboardNavItem.id)}
              <span className="nav-item-label">{dashboardNavItem.label}</span>
            </button>

            {navGroups.map((group) => (
              <details
                key={group.id}
                className="nav-group"
                open={openNavGroups[group.id]}
                onToggle={(event) => {
                  const isOpen = (event.currentTarget as HTMLDetailsElement).open;
                  setOpenNavGroups((prev) => ({ ...prev, [group.id]: isOpen }));
                }}
              >
                <summary>
                  <span className="nav-group-title">
                    {getGroupIcon(group.id)}
                    {group.label}
                  </span>
                  <ChevronDown size={14} className="nav-group-chevron" />
                </summary>
                <div className="nav-group-items">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      className={
                        currentPage === item.id ? "nav-item active" : "nav-item"
                      }
                      onClick={() => onNavigate(item.id)}
                      type="button"
                    >
                      {getNavItemIcon(item.id)}
                      <span className="nav-item-label">{item.label}</span>
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </aside>

        <section className="content-shell">
          <div className="content card-surface">{children}</div>
        </section>
      </div>
    </main>
  );
}
