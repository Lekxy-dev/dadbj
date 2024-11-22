"use client";
import { formatprice } from "@/Utils/FormatPrice";
import { CartProductType } from "../Product/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/Utils/Tunicate";
import Image from "next/image";
import SetQuantity from "../Component/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContProps {
  item: CartProductType;
}

const ItemCont: React.FC<ItemContProps> = ({ item }) => {
  const { handleRemoveProductFromCart,handleCartQtyIncrease,handleCartQtyDecrease,handleCartClear } = useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.slectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}
          </Link>
          <div>{item.slectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatprice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {handleCartQtyIncrease(item)}}
          handleQtyDecrease={() => {handleCartQtyDecrease(item)}}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatprice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemCont;
