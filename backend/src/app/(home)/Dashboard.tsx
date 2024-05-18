"use client";
import React from "react";
import { FormattedNumber } from "react-intl";
import { StatsCard } from "./StatsCard";
import { DashboardData, MarketData, ProviderSnapshotsUrlParam, SnapshotsUrlParam } from "@/types";
import { bytesToShrink } from "@/lib/unitUtils";
import { Title } from "@/components/Title";
import { Separator } from "@/components/ui/separator";
import { percIncrease, udenomToDenom } from "@/lib/mathHelpers";
import { USDCLabel } from "@/components/UsdLabel";
import { UrlService } from "@/lib/urlUtils";
import { HumanReadableBytes } from "@/components/HumanReadableBytes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlockRow } from "../../components/blockchain/BlockRow";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TransactionRow } from "../../components/blockchain/TransactionRow";
import SearchBar from "@/components/SearchBar";
import { AKTAmount } from "@/components/AKTAmount";
import { AKTLabel } from "@/components/AKTLabel";

interface IDashboardProps {
  dashboardData: DashboardData;
  marketData: MarketData;
}

export const Dashboard: React.FunctionComponent<IDashboardProps> = ({ dashboardData, marketData }) => {
  const memoryDiff = bytesToShrink(dashboardData.now.activeMemory - dashboardData.compare.activeMemory);
  const storageDiff = bytesToShrink(dashboardData.now.activeStorage - dashboardData.compare.activeStorage);
  const capacityMemoryDiff = bytesToShrink(dashboardData.networkCapacityStats.now.memory - dashboardData.networkCapacityStats.compare.memory);
  const capacityStorageDiff = bytesToShrink(dashboardData.networkCapacityStats.now.storage - dashboardData.networkCapacityStats.compare.storage);

  return (
    <>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          text="AKT Price"
          number={
            <FormattedNumber style="currency" currency="USD" value={marketData.price} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
          }
          diffPercent={marketData.priceChangePercentage24 / 100}
        />

        <StatsCard
          text="Market Cap"
          number={
            <FormattedNumber style="currency" currency="USD" value={marketData.marketCap} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
          }
        />
        <StatsCard
          text="Volume (24h)"
          number={
            <FormattedNumber style="currency" currency="USD" value={marketData.volume} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
          }
        />
        <StatsCard text="Rank" number={marketData.marketCapRank} />
      </div> */}

<Title subTitle className="mb-4">
        Akash Chain Data
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard number={<FormattedNumber value={dashboardData.chainStats.height} />} text="Height" />

        <StatsCard number={<FormattedNumber value={dashboardData.chainStats.transactionCount} />} text="Transactions" />

        <StatsCard number={<AKTAmount uakt={dashboardData.chainStats.communityPool} digits={0} showAKTLabel showUSD />} text="Community pool" />

        <StatsCard
          number={
            <>
              <FormattedNumber value={udenomToDenom(dashboardData.chainStats.bondedTokens)} notation="compact" maximumFractionDigits={2} /> /{" "}
              <FormattedNumber value={udenomToDenom(dashboardData.chainStats.totalSupply)} notation="compact" maximumFractionDigits={2} />
              <span className="ml-4 text-sm text-muted-foreground">
                <FormattedNumber
                  value={udenomToDenom(dashboardData.chainStats.bondedTokens) / udenomToDenom(dashboardData.chainStats.totalSupply)}
                  style="percent"
                  maximumFractionDigits={2}
                />
              </span>
            </>
          }
          text="Bonded tokens"
        />

        <StatsCard
          number={<FormattedNumber value={dashboardData.chainStats.inflation} style="percent" minimumFractionDigits={2} maximumFractionDigits={2} />}
          text="Inflation"
        />

        <StatsCard
          number={<FormattedNumber value={dashboardData.chainStats.stakingAPR} style="percent" minimumFractionDigits={2} maximumFractionDigits={2} />}
          text="Staking APR"
        />
      </div>
      <Separator className="mb-8 mt-8" />

      <Title subTitle className="mb-4">
        Resources Leased on Akash
      </Title>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          number={<FormattedNumber value={dashboardData.now.activeLeaseCount} notation="compact" compactDisplay="short" maximumFractionDigits={2} />}
          text="Active leases"
          tooltip={
            <>
              <div>Number of leases currently active on the network.</div>
            </>
          }
          graphPath={UrlService.graph(SnapshotsUrlParam.activeLeases)}
          diffNumber={dashboardData.now.activeLeaseCount - dashboardData.compare.activeLeaseCount}
          diffPercent={percIncrease(dashboardData.compare.activeLeaseCount, dashboardData.now.activeLeaseCount)}
        />

        <StatsCard
          number={
            <>
              <FormattedNumber value={dashboardData.now.activeCPU / 1000} maximumFractionDigits={2} notation="compact" compactDisplay="short" />{" "}
              <span className="text-sm">CPU</span>
            </>
          }
          text="Compute"
          graphPath={UrlService.graph(SnapshotsUrlParam.compute)}
          diffNumber={(dashboardData.now.activeCPU - dashboardData.compare.activeCPU) / 1000}
          diffPercent={percIncrease(dashboardData.compare.activeCPU, dashboardData.now.activeCPU)}
        />

        <StatsCard
          number={
            <>
              <FormattedNumber value={dashboardData.now.activeGPU} maximumFractionDigits={2} notation="compact" compactDisplay="short" />{" "}
              <span className="text-sm">GPU</span>
            </>
          }
          text="Graphics"
          graphPath={UrlService.graph(SnapshotsUrlParam.graphics)}
          diffNumber={dashboardData.now.activeGPU - dashboardData.compare.activeGPU}
          diffPercent={percIncrease(dashboardData.compare.activeGPU, dashboardData.now.activeGPU)}
        />

        <StatsCard
          number={<HumanReadableBytes value={dashboardData.now.activeMemory} />}
          text="Memory"
          graphPath={UrlService.graph(SnapshotsUrlParam.memory)}
          diffNumberUnit={memoryDiff.unit}
          diffNumber={memoryDiff.value}
          diffPercent={percIncrease(dashboardData.compare.activeMemory, dashboardData.now.activeMemory)}
        />

        <StatsCard
          number={<HumanReadableBytes value={dashboardData.now.activeStorage} />}
          text="Storage"
          graphPath={UrlService.graph(SnapshotsUrlParam.storage)}
          diffNumberUnit={storageDiff.unit}
          diffNumber={storageDiff.value}
          diffPercent={percIncrease(dashboardData.compare.activeStorage, dashboardData.now.activeStorage)}
        />
      </div>

      <Separator className="mb-8 mt-8" />
      <Title subTitle className="mb-4">
        Network Capacity
      </Title>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          number={<FormattedNumber value={dashboardData.networkCapacity.activeProviderCount} notation="compact" compactDisplay="short" />}
          text="Active providers"
          graphPath={UrlService.providerGraph(ProviderSnapshotsUrlParam.count)}
          diffNumber={dashboardData.networkCapacityStats.now.count - dashboardData.networkCapacityStats.compare.count}
          diffPercent={percIncrease(dashboardData.networkCapacityStats.compare.count, dashboardData.networkCapacityStats.now.count)}
          tooltip={
            <>
              <div>This is the number of providers currently active on the network.</div>
            </>
          }
        />

        <StatsCard
          number={
            <>
              <FormattedNumber value={dashboardData.networkCapacity.totalCPU / 1000} maximumFractionDigits={2} notation="compact" compactDisplay="short" />{" "}
              <span className="text-sm">CPU</span>
            </>
          }
          text="Compute"
          graphPath={UrlService.providerGraph(ProviderSnapshotsUrlParam.cpu)}
          diffNumber={(dashboardData.networkCapacityStats.now.cpu - dashboardData.networkCapacityStats.compare.cpu) / 1000}
          diffPercent={percIncrease(dashboardData.networkCapacityStats.compare.cpu, dashboardData.networkCapacityStats.now.cpu)}
        />
        <StatsCard
          number={
            <>
              <FormattedNumber value={dashboardData.networkCapacity.totalGPU} maximumFractionDigits={2} notation="compact" compactDisplay="short" />{" "}
              <span className="text-sm">GPU</span>
            </>
          }
          text="Graphics"
          graphPath={UrlService.providerGraph(ProviderSnapshotsUrlParam.gpu)}
          diffNumber={dashboardData.networkCapacityStats.now.gpu - dashboardData.networkCapacityStats.compare.gpu}
          diffPercent={percIncrease(dashboardData.networkCapacityStats.compare.gpu, dashboardData.networkCapacityStats.now.gpu)}
        />

        <StatsCard
          number={<HumanReadableBytes value={dashboardData.networkCapacity.totalMemory} />}
          text="Memory"
          diffNumberUnit={capacityMemoryDiff.unit}
          diffNumber={capacityMemoryDiff.value}
          diffPercent={percIncrease(dashboardData.networkCapacityStats.compare.memory, dashboardData.networkCapacityStats.now.memory)}
          graphPath={UrlService.providerGraph(ProviderSnapshotsUrlParam.memory)}
        />

        <StatsCard
          number={<HumanReadableBytes value={dashboardData.networkCapacity.totalStorage} />}
          text="Storage"
          graphPath={UrlService.providerGraph(ProviderSnapshotsUrlParam.storage)}
          diffNumberUnit={capacityStorageDiff.unit}
          diffNumber={capacityStorageDiff.value}
          diffPercent={percIncrease(dashboardData.networkCapacityStats.compare.storage, dashboardData.networkCapacityStats.now.storage)}
        />
      </div>

      <Separator className="mb-8 mt-8" />
      <Title subTitle className="mb-4">
        Spent Assets
      </Title>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          number={
            <>
              <FormattedNumber value={udenomToDenom(dashboardData.now.dailyUAktSpent)} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
              <AKTLabel />
            </>
          }
          text="AKT spent (24h)"
          tooltip="Last 24h"
          graphPath={UrlService.graph(SnapshotsUrlParam.dailyAktSpent)}
          diffNumber={udenomToDenom(dashboardData.now.dailyUAktSpent - dashboardData.compare.dailyUAktSpent)}
          diffPercent={percIncrease(dashboardData.compare.dailyUAktSpent, dashboardData.now.dailyUAktSpent)}
        />
        <StatsCard
          number={
            <>
              <FormattedNumber value={udenomToDenom(dashboardData.now.totalUAktSpent)} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
              <AKTLabel />
            </>
          }
          text="Total spent AKT"
          tooltip="This is the total amount of akt spent to rent computing power on the akash network since the beginning of the network. (March 2021)"
          graphPath={UrlService.graph(SnapshotsUrlParam.totalAKTSpent)}
          diffNumber={udenomToDenom(dashboardData.now.totalUAktSpent - dashboardData.compare.totalUAktSpent)}
          diffPercent={percIncrease(dashboardData.compare.totalUAktSpent, dashboardData.now.totalUAktSpent)}
        />

        <StatsCard
          number={
            <>
              <FormattedNumber value={udenomToDenom(dashboardData.now.dailyUUsdcSpent)} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
              <USDCLabel />
            </>
          }
          text="USDC spent (24h)"
          tooltip="Last 24h"
          graphPath={UrlService.graph(SnapshotsUrlParam.dailyUsdcSpent)}
          diffNumber={udenomToDenom(dashboardData.now.dailyUUsdcSpent - dashboardData.compare.dailyUUsdcSpent)}
          diffPercent={percIncrease(dashboardData.compare.dailyUUsdcSpent, dashboardData.now.dailyUUsdcSpent)}
        />

        <StatsCard
          number={
            <>
              <FormattedNumber value={udenomToDenom(dashboardData.now.totalUUsdcSpent)} maximumFractionDigits={2} notation="compact" compactDisplay="short" />
              <USDCLabel />
            </>
          }
          text="Total spent USDC"
          tooltip="This is the total amount of usdc spent to rent computing power on the akash network since the Mainnet 6 upgrade that added usdc support. (August 2023)"
          graphPath={UrlService.graph(SnapshotsUrlParam.totalUSDCSpent)}
          diffNumber={udenomToDenom(dashboardData.now.totalUUsdcSpent - dashboardData.compare.totalUUsdcSpent)}
          diffPercent={percIncrease(dashboardData.compare.totalUUsdcSpent, dashboardData.now.totalUUsdcSpent)}
        />
      </div>

     
    </>
  );
};
