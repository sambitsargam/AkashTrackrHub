"use client";
import React, { ReactNode } from "react";
import { UrlService } from "@/lib/urlUtils";
import PageContainer from "@/components/PageContainer";
import { Title } from "@/components/Title";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next-nprogress-bar";

type AddressTab = "address" | "transactions" | "deployments";
type Props = {
  address: string;
  children?: ReactNode;
  page: AddressTab;
};

export default function AddressLayout({ children, page, address }: Props) {
  const router = useRouter();

  const handleTabChange = (newValue: string) => {
    switch (newValue) {
      case "transactions":
        router.push(UrlService.addressTransactions(address));
        break;
      case "deployments":
        router.push(UrlService.addressDeployments(address));
        break;
      case "address":
      default:
        router.push(UrlService.address(address));
        break;
    }
  };

  return (
    <PageContainer>
      <Title className="mb-4">Account Detail</Title>

      <Tabs value={page} onValueChange={handleTabChange}>

        {children}
      </Tabs>
    </PageContainer>
  );
}
