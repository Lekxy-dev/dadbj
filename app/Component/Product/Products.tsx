"use client";

import { formatprice } from "@/Utils/FormatPrice";
import { truncateText } from "@/Utils/Tunicate";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";


 
interface ProductCardProps{
    data:any
}


const ProductCard:React.FC<ProductCardProps> = ({data}) => {
    
    const productRating = data.reviews.reduce((acc:number,item:any) => item.rating + acc, 0) / data.reviews.length
  const router = useRouter()
    return ( <div  onClick={() =>router.push(`/Product/${data.id}`)}className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 p-2 transition hover:scale-105 text-content text-sm">
        <div className="flex flex-col items-center w-full gap-1">
            <div className="aspect-square overflow-hidden relative w-full"> <Image fill  src={data.images[0].image} alt={data.name} className="w-full h-full object-contain" /> </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className="font-semibold">{formatprice(data.price)}</div>
        </div>
    </div> );
}
 
export default ProductCard;