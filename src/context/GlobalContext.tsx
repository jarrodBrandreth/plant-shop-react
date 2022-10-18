import { createContext, useContext, useState, useEffect } from 'react';
import { ProductProps, CartProductProps, OrderProductProps } from '../types/Types';

interface GlobalContextProps {
  productStatus: {
    loading: boolean;
    error: boolean;
  };
  products: ProductProps[];
  updateProductQty: (orderProducts: OrderProductProps[]) => void;
  likedItems: ProductProps[];
  updateLikedItems: (item: ProductProps) => void;
  cart: {
    items: CartProductProps[];
    totalPrice: number;
    totalProducts: number;
    addToCart: (item: ProductProps) => void;
    clearCart: () => void;
    removeByQuantity: (id: number) => void;
    removeItemFromCart: (id: number) => void;
  };
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function GlobalProvider({ children }: any) {
  const [products, setProducts] = useState<Array<ProductProps>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cartItems, setCartItems] = useState<Array<CartProductProps>>([]);
  const [likedItems, setLikedItems] = useState<Array<ProductProps>>([]);

  const url = 'https://my-json-server.typicode.com/jarrodBrandreth/Dummy-Data/plants';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateProductQty = (orderProducts: OrderProductProps[]) => {
    setProducts((products) => {
      return products.map((product) => {
        const orderItem = orderProducts.find((orderProduct) => orderProduct.id === product.id);
        if (orderItem) product.quantity = product.quantity - orderItem.quantity;
        return product;
      });
    });
  };

  // takes item and either adds it to liked items or removes it if it contains it
  const updateLikedItems = (item: ProductProps) => {
    const index = likedItems.findIndex((product) => product.id === item.id);
    if (index >= 0) {
      const likedItemsCopy = [...likedItems];
      likedItemsCopy.splice(index, 1);
      setLikedItems(likedItemsCopy);
    } else {
      setLikedItems([...likedItems, item]);
    }
  };

  /* Cart Functions */
  const addToCart = (item: ProductProps) => {
    const newItem = { product: { ...item }, quantity: 1 };
    const productIndex = cartItems.findIndex((item) => item.product.id === newItem.product.id);
    if (productIndex >= 0) {
      const cartItemsCopy = [...cartItems];
      cartItemsCopy[productIndex].quantity += 1;
      setCartItems(cartItemsCopy);
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeByQuantity = (id: number) => {
    if (cartItems.length === 0) return;
    const newList = [...cartItems]
      .map((item) => {
        if (item.product.id === id) item.quantity -= 1;
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(newList);
  };

  const removeItemFromCart = (id: number) => {
    const result = [...cartItems].filter((item) => item.product.id !== id);
    setCartItems(result);
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = (cartItems: CartProductProps[]): number => {
    if (cartItems.length === 0) return 0;
    return cartItems.reduce((total, currentItem) => {
      return total + currentItem.product.price * currentItem.quantity;
    }, 0);
  };

  const totalPrice = getTotalPrice(cartItems);

  const totalProducts = cartItems.reduce((total, currentItem) => {
    return total + currentItem.quantity;
  }, 0);

  const value: GlobalContextProps = {
    productStatus: {
      error: error,
      loading: loading,
    },
    products: products,
    updateProductQty,
    likedItems,
    updateLikedItems,
    cart: {
      items: cartItems,
      addToCart,
      clearCart,
      removeItemFromCart,
      removeByQuantity,
      totalPrice,
      totalProducts,
    },
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a Global Provider');
  }
  return context;
}
