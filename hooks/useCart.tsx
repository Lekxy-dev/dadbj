import { CartProductType } from "@/app/Product/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartPs: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleCartClear: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartPs, setCartProducts] = useState<CartProductType[] | null>(null); 
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("dSquareCartItem");
        const cProduct: CartProductType[] | null = JSON.parse(cartItems); 
        const dsquarePaymentIntent:any = localStorage.getItem("dsquarePaymentIntent");
        const paymentIntent: string | null =  JSON.parse(dsquarePaymentIntent);

        setCartProducts(cProduct); 
        setPaymentIntent(paymentIntent); 
    }, []);

    useEffect(() => {
        // Update total quantity and amount whenever cartPs changes
        if (cartPs) {
            const { total, qty } = cartPs.reduce(
                (acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                    return acc;
                },
                { total: 0, qty: 0 }
            );
            setCartTotalQty(qty);
            setCartTotalAmount(total);
        }
    }, [cartPs]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        setCartProducts((prevCart) => {
            const cart = prevCart ?? [];  // Fallback to empty array if prevCart is null
            const existingProduct = cart.find((item) => item.id === product.id);

            let updatedCart;
            if (existingProduct) {
                updatedCart = cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                updatedCart = [...cart, product];
            }

            toast.success("Product added to cart");
            localStorage.setItem("dSquareCartItem", JSON.stringify(updatedCart));

            return updatedCart;
        });
    }, []);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        setCartProducts((prevCart) => {
            const cart = prevCart ?? [];  // Fallback to empty array if prevCart is null
            const updatedCart = cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            );

            toast.success("Product quantity decreased");
            localStorage.setItem("dSquareCartItem", JSON.stringify(updatedCart)); // Save to localStorage

            return updatedCart;
        });
    }, []);

    const handleCartClear = useCallback(() => {
        setCartProducts(null); 
        setCartTotalQty(0);    
        localStorage.setItem("dSquareCartItem", JSON.stringify([])); 
    }, [cartPs]);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prevCart) => {
            const cart = prevCart ?? []; 
            const existingProduct = cart.find((item) => item.id === product.id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                updatedCart = [...cart, product];
            }

            toast.success("Product added to cart");
            localStorage.setItem("dSquareCartItem", JSON.stringify(updatedCart)); // Save to localStorage

            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProducts((prevCart) => {
            const cart = prevCart ?? [];  // Fallback to empty array if prevCart is null
            const updatedCart = cart.filter((item) => item.id !== product.id);

            toast.success("Product removed from cart");
            localStorage.setItem("dSquareCartItem", JSON.stringify(updatedCart)); // Save to localStorage

            return updatedCart;
        });
    }, []);

    


    const handleSetPaymentIntent =  useCallback((val: string | null ) =>{
        setPaymentIntent(val);
        localStorage.setItem("dsquareGadgetPaymentIntent",JSON.stringify(val))
       },[paymentIntent])

    const value = {
        cartTotalQty,
        cartPs,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleCartClear,
        cartTotalAmount,
        paymentIntent,
        handleSetPaymentIntent,
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};
