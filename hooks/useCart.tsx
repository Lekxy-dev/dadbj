import { CartProductType } from "@/app/Product/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartPs: CartProductType[];
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
    const [cartPs, setCartProducts] = useState<CartProductType[]>([]); // Set initial value as empty array
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

    useEffect(() => {
        const cartItems = localStorage.getItem('dSquareCartItem');
        const cProduct: CartProductType[] = cartItems ? JSON.parse(cartItems) : [];
        const dsquarePaymentIntent = localStorage.getItem('dsquarePaymentIntent');
        const paymentIntent: string | null = dsquarePaymentIntent ? JSON.parse(dsquarePaymentIntent) : null;

        setCartProducts(cProduct);
        setPaymentIntent(paymentIntent);
    }, []);

    useEffect(() => {
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

    const handleCartQtyIncrease = useCallback(
        (product: CartProductType) => {
            if (product.quantity === 20) {
                return toast.error("Opp! Maximum reached");
            }

            if (cartPs) {
                const updatedCart = [...cartPs];
                const existingIndex = cartPs.findIndex((item) => item.id === product.id);
                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity += 1;
                }
                setCartProducts(updatedCart);
                localStorage.setItem('dSquareCartItem', JSON.stringify(updatedCart));
            }
        },
        [cartPs]
    );

    const handleCartQtyDecrease = useCallback(
        (product: CartProductType) => {
            if (product.quantity === 1) {
                return toast.error("Opp! Minimum reached");
            }

            if (cartPs) {
                const updatedCart = [...cartPs];
                const existingIndex = cartPs.findIndex((item) => item.id === product.id);
                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity -= 1;
                }
                setCartProducts(updatedCart);
                localStorage.setItem('dSquareCartItem', JSON.stringify(updatedCart));
            }
        },
        [cartPs]
    );

    const handleCartClear = useCallback(() => {
        setCartProducts([]);
        setCartTotalQty(0);
        setCartTotalAmount(0); // Reset total amount as well
        localStorage.setItem('dSquareCartItem', JSON.stringify([])); // Keep an empty array in localStorage
    }, [cartPs]);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            } else {
                updatedCart = [...prevCart, product];
            }
            toast.success("Product added to cart");
            localStorage.setItem('dSquareCartItem', JSON.stringify(updatedCart));

            const totalQty = updatedCart.reduce((total, product) => total + product.quantity, 0);
            setCartTotalQty(totalQty);

            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProducts((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== product.id);
            toast.success("Product removed from cart");
            localStorage.setItem('dSquareCartItem', JSON.stringify(updatedCart));

            const totalQty = updatedCart.reduce((total, product) => total + product.quantity, 0);
            setCartTotalQty(totalQty);

            return updatedCart;
        });
    }, []);

    const handleSetPaymentIntent = useCallback(
        (val: string | null) => {
            setPaymentIntent(val);
            localStorage.setItem("dsquarePaymentIntent", JSON.stringify(val));
        },
        []
    );

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
