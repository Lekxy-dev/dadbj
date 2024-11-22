"use client"
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Heading from "../Component/Heading";
import Button from "../Component/Button";
import ItemCont from "./ItemContent";
import { formatprice } from "@/Utils/FormatPrice";

const CartClient = () => {
   const {cartTotalAmount,cartPs,handleCartClear} = useCart()
    if (!cartPs || cartPs.length === 0 )
    return ( <div className="flex flex-col items-center">
        <div className="text-2xl">Your  cart is empty</div>
        <div>
            <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
            <IoMdArrowBack />
            <span>Start Shopping</span>
            </Link>
        </div>
    </div> );

    return (
        <div>
        <Heading title="Shopping Cart" center/>
        <div className="grid grid-cols-5 text-x5 gap-4 gb-2 items-center mt-8">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className="justify-self-center">PRICE</div>
            <div className="justify-self-center">QUANTITY</div>
            <div className="justify-self-end">TOTAL</div>
        </div>
    
      
        {cartPs && cartPs.map((item) => {
            return (
                <ItemCont key={item.id} item={item}/>
            );
        })}
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[90px]">
                <Button label="Clear cart" onclick={() =>{handleCartClear()}} small outline/>
            </div>
            <div className="text-sm flex flex-col gap-1">
                
                    <div className="flex justify-between w-full text-base font-semibold"> 
                        <span >Subtotal</span>
                        <span>{formatprice(cartTotalAmount)}</span>
                    </div>
                   
                    <p className="text-slate-500">Taxes and shipping calculate at checkout</p>
                <Button label="Checkout" onclick={() => {}}/>
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
            <IoMdArrowBack />
            <span>Continue Shopping</span>
            </Link>
            </div>
        </div>
    </div>
      
    )
}
 
 
export default CartClient;