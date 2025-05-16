import Link from "next/link";
import { cn, generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
   className?:string;
   hideIfEmpty?: boolean;
   tenantSlug: string;
}

export const CheckoutButton = ({
   className,
   hideIfEmpty,
   tenantSlug
}: CheckoutButtonProps) => {
   const {totalItems} = useCart(tenantSlug);

   if(hideIfEmpty && totalItems === 0) return null;

   return (
      <Button
         asChild
         variant={"elevated"}
         className={cn("bg-white", className)}
      >
         <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
            <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
         </Link>
      </Button>
   )
}