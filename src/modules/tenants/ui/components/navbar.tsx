"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

interface Props {
  slug: string;
}

const CheckoutButton = dynamic(
   () => import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton,
   ),
   {
      ssr: false,
      loading: () => (
        <Button disabled className="bg-white">
          <ShoppingCartIcon className="text-black" />
        </Button>
      )
   }
);

export const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const options = useMemo(
    () => trpc.tenants.getOne.queryOptions({ slug }),
    [slug]
  );

  const { data } = useSuspenseQuery(options);

  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={generateTenantUrl(slug)} className="flex items-center gap-2">
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <CheckoutButton hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        {/* TODO: Skeleton for checkout button */}
      </div>
    </nav>
  );
};
