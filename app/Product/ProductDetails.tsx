"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "../Component/Product/SetColor";
import SetQuantity from "../Component/SetQuantity";
import Button from "../Component/Button";
import ProductImg from "../Component/ProductImg";
import { useCart } from "@/hooks/useCart";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  produc: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  slectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30% ] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ produc }) => {
  const { handleAddProductToCart, cartPs } = useCart();
  const [isProductIncart, setIsProductIncart] = useState(false);

  const [CartProduct, setCartProduct] = useState<CartProductType>({
    id: produc.id,
    name: produc.name,
    description: produc.description,
    category: produc.category,
    brand: produc.brand,
    slectedImg: { ...produc.images[0] },
    quantity: 1,
    price: produc.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductIncart(false);
    if (cartPs) {
      const existingIndex = cartPs.findIndex((item) => item.id === produc.id);
      if (existingIndex > -1) {
        setIsProductIncart(true);
      }
    }
  }, [cartPs, produc]);

  const productRating = produc.reviews.reduce(
    (acc: number, item: any) => item.rating + acc,
    0
  ) / produc.reviews.length;

  const handlColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => ({
        ...prev,
        slectedImg: value,
      }));
    },
    []
  );

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity < 30) {
        return {
          ...prev,
          quantity: prev.quantity ++,
        };
      }
      return prev;
    });
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity > 1) {
        return {
          ...prev,
          quantity: prev.quantity - 1,
        };
      }
      return prev;
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImg
        cartProduct={CartProduct}
        product={produc}
        handleColorSelect={handlColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{produc.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{produc.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{produc.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {produc.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {produc.brand}
        </div>
        <div
          className={produc.inStock ? "text-teal-400" : "text-rose-400"}
        >
          {produc.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        {isProductIncart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <IoMdCheckmarkCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onclick={() => router.push("/Cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={CartProduct}
              images={produc.images}
              handlColorSelect={handlColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={CartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onclick={() => handleAddProductToCart(CartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
