"use client";
import { useSelectedNetwork } from "@/hooks/useSelectedNetwork";
import { useDashboardData } from "@/queries/useDashboardData";
import { ReactNode } from "react";
import { Dashboard } from "./Dashboard";
import Spinner from "@/components/Spinner";
import { Title } from "@/components/Title";
import { FormattedDate, FormattedTime } from "react-intl";
import { useMarketData } from "@/queries";

type Props = {
  children?: ReactNode;
};

export const DashboardContainer: React.FunctionComponent<Props> = ({}) => {
  const { data: dashboardData, isLoading: isLoadingDashboardData } = useDashboardData();
  const { data: marketData, isLoading: isLoadingMarketData } = useMarketData();
  const selectedNetwork = useSelectedNetwork();
  const isLoading = isLoadingMarketData || isLoadingDashboardData;

  return (
    <div className="mt-1">
      {dashboardData && marketData && (
        <>
          <Dashboard dashboardData={dashboardData} marketData={marketData} />
        </>
      )}

      {isLoading && !dashboardData && (
        <div className="flex items-center justify-center p-4">
          <Spinner size="large" />
        </div>
      )}
    </div>
  );
};
