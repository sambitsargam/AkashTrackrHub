import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { Title } from "@/components/Title";
import { UrlService } from "@/lib/urlUtils";
import { ArrowLeft } from "iconoir-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found"
};

export default function FourOhFour({}: React.PropsWithChildren<{}>) {
  return (
    <PageContainer>
      <div className="mt-10 text-center">
        <Title className="mb-2">404</Title>
        <h3 className="text-xl">Page not found.</h3>

        <div className="pt-8">
          <Link href={UrlService.home()} className="inline-flex items-center text-2xl">
            <ArrowLeft className="mr-4 text-lg" />
            Go to homepage
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
