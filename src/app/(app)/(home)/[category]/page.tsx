import type { SearchParams } from "nuqs/server";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/components/views/product-list-view";

interface Props {
  params: Promise<{
    category: string;
  }>,
  searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);  

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category,
      ...filters,
    })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView category={category} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
