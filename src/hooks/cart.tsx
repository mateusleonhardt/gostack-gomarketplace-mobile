import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const cart = await AsyncStorage.getItem('@GoMarketplace:cart');

      if (cart) setProducts(JSON.parse(cart));
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const productsList = products.map(productItem => {
        if (productItem.id === id) {
          productItem.quantity += 1;
        }

        return productItem;
      });

      setProducts([...productsList]);

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      let productsList = products.map(productItem => {
        if (productItem.id === id) {
          productItem.quantity -= 1;
        }

        return productItem;
      });

      productsList = productsList.filter(product => product.quantity > 0);

      setProducts([...productsList]);

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(productsList),
      );
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const productItem = products.filter(item => item.id === product.id);

      if (!productItem.length) {
        product.quantity = 1;
        setProducts([...products, product]);

        await AsyncStorage.setItem(
          '@GoMarketplace:cart',
          JSON.stringify(products),
        );
      } else {
        increment(product.id);
      }
    },
    [products, increment],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
