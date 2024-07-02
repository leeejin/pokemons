"use client";

import Button from "@/components/Button";
import Page from "@/components/Page";
import { useRouter } from "next/navigation";

function DetailLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Page title="디테일페이지" isTitleHidden>
      <div className="bg-white rounded text-black text-center w-[598px] m-auto pb-2">
        {children}

        <Button
          onClick={() => {
            router.back();
          }}
        >
          뒤로가기
        </Button>
      </div>
    </Page>
  );
}

export default DetailLayout;
