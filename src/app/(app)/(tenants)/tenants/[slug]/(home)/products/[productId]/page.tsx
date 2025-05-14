import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductView } from "@/modules/products/ui/components/views/product-view";


interface Props {
   params: Promise<{productId: string; slug:string}>;
}

const Page = async ({params}: Props) => {
   const {slug, productId} = await params;
   const queryClient = getQueryClient();
   void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({slug}));
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <ProductView 
            productId={productId}
            tenantSlug={slug}
         />
      </HydrationBoundary>
   )
}

export default Page;