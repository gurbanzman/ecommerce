import type { SearchParams } from "nuqs/server";
import { DEFAULT_LIMIT } from "@/constants";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/components/views/product-list-view";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);  

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
