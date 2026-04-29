import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { pageMetaMap } from "@/data/navigation-data";
import type { AppPageId } from "@/models/navigation";
import { BasketDefinitionPage } from "@/pages/BasketDefinitionPage";
import { DesignSystemPage } from "@/pages/DesignSystemPage";
import { MasterDataDashboardPage } from "@/pages/MasterDataDashboardPage";
import { ModuleHomePage } from "@/pages/ModuleHomePage";
import { OwnersPage } from "@/pages/OwnersPage";
import { PathsPage } from "@/pages/PathsPage";
import { StagesPage } from "@/pages/StagesPage";
import { StatesPage } from "@/pages/StatesPage";
import { SectionsPage } from "@/pages/SectionsPage";
import { SubSectionsPage } from "@/pages/SubSectionsPage";
import { WorkOrderTypesPage } from "@/pages/WorkOrderTypesPage";
import { VerificationItemsPage } from "@/pages/VerificationItemsPage";
import { WorkOrderDetailsPage } from "@/pages/WorkOrderDetailsPage";
import { WorkOrdersPage } from "@/pages/WorkOrdersPage";
import type { WorkOrder } from "@/models/work-order";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPageId>("module-home");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const pageMeta = pageMetaMap[currentPage];

  return (
    <ModuleLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      pageTitle={pageMeta.title}
      pageDescription={pageMeta.description}
    >
      <section className="content-page">
        {currentPage === "module-home" ? <ModuleHomePage onNavigate={setCurrentPage} /> : null}
        {currentPage === "work-orders" ? (
          <WorkOrdersPage
            onOpenDetailsPage={(order) => {
              setSelectedWorkOrder(order);
              setCurrentPage("work-order-details");
            }}
          />
        ) : null}
        {currentPage === "work-order-details" ? (
          <WorkOrderDetailsPage
            order={selectedWorkOrder}
            onBack={() => setCurrentPage("work-orders")}
          />
        ) : null}
        {currentPage === "design-system" ? <DesignSystemPage onNavigate={setCurrentPage} /> : null}
        {currentPage === "master-data" ? <MasterDataDashboardPage onNavigate={setCurrentPage} /> : null}
        {currentPage === "states" ? <StatesPage /> : null}
        {currentPage === "sections" ? <SectionsPage /> : null}
        {currentPage === "sub-sections" ? <SubSectionsPage /> : null}
        {currentPage === "types" ? <WorkOrderTypesPage /> : null}
        {currentPage === "owners" ? <OwnersPage /> : null}
        {currentPage === "paths" ? <PathsPage /> : null}
        {currentPage === "stages" ? <StagesPage /> : null}
        {currentPage === "basket-definition" ? <BasketDefinitionPage /> : null}
        {currentPage === "verification-items" ? <VerificationItemsPage /> : null}
      </section>
    </ModuleLayout>
  );
}

export default App;
