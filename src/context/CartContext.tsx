import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { cartItemKey, itemTotal } from '../utils/cart';
import type { Product, LicenseOption } from '../data/products';
import { trackEvent } from '../utils/pixel';

interface CartContextType {
  cartItems: Product[];
  cartAddVersion: number;
  isCartOpen: boolean;
  couponCode: string;
  subtotal: number;
  discountAmount: number;
  total: number;
  discountPercentage: number;
  addToCart: (
    product: Product,
    subOption?: 'recurrent' | 'avulso',
    licenseOption?: LicenseOption,
    deviceCount?: number
  ) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (key: string, quantity: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('c2shop_cart') || '[]');
      return Array.isArray(saved) ? saved.filter((item): item is Product => Boolean(item && typeof item.id === 'string' && typeof item.name === 'string' && typeof item.price === 'number')).map(item => {
        const current = products.find(product => product.slug === item.slug);
        if(!current)return item;
        const option = current.licenseOptions?.find(option => option.quantity === item.selectedLicenseOption?.quantity);
        if(item.selectedLicenseOption && !option)return item;
        return {...current, selectedLicenseOption:option, selectedSubOption:item.selectedSubOption, deviceCount:item.deviceCount};
      }) : [];
    } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAddVersion, setCartAddVersion] = useState(0);
  const [couponCode, setCouponCode] = useState(() => {
    try { return localStorage.getItem('c2shop_coupon') || ''; } catch { return ''; }
  });

  // Save cart to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('c2shop_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  // Save coupon to localStorage when changed
  useEffect(() => {
    try {
      if (couponCode) {
        localStorage.setItem('c2shop_coupon', couponCode);
      } else {
        localStorage.removeItem('c2shop_coupon');
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage:', e);
    }
  }, [couponCode]);

  const addToCart = (
    product: Product,
    subOption?: 'recurrent' | 'avulso',
    licenseOption?: LicenseOption,
    deviceCount: number = 1
  ) => {
    if (product.unavailable) return;

    setCartAddVersion(version => version + 1);

    const chosenOption = licenseOption !== undefined ? licenseOption : (product.licenseOptions && product.licenseOptions.length > 0 ? product.licenseOptions[0] : undefined);
    const chosenSubOption = chosenOption ? 'avulso' : (subOption || 'recurrent');
    const validDeviceCount = Math.min(99, Math.max(1, Math.trunc(deviceCount)));

    setCartItems((prev) => {
      // Check if already in cart
      const chosenKey = cartItemKey({ ...product, selectedLicenseOption: chosenOption, selectedSubOption: chosenSubOption });
      const exists = prev.find((item) => cartItemKey(item) === chosenKey);
      if (exists) {
        return prev.map((item) =>
          cartItemKey(item) === chosenKey
            ? {
                ...item,
                selectedSubOption: chosenSubOption,
                selectedLicenseOption: chosenOption,
                deviceCount: validDeviceCount,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          selectedSubOption: chosenSubOption,
          selectedLicenseOption: chosenOption,
          deviceCount: validDeviceCount,
        },
      ];
    });

    // Track AddToCart on Facebook Pixel
    const unitPrice = chosenOption
      ? chosenOption.price
      : (product.isSubscription && chosenSubOption === 'recurrent'
          ? (product.recurrencePrice || product.price)
          : product.price);
    const itemPrice = unitPrice * validDeviceCount;
    trackEvent('AddToCart', {
      content_name: product.name,
      content_ids: [product.slug],
      content_type: 'product',
      value: itemPrice,
      currency: 'BRL',
    });

    // Automatically open the cart drawer
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => cartItemKey(item) !== productId));
  };

  const updateQuantity = (key: string, quantity: number) => {
    setCartItems(prev => prev.map(item => cartItemKey(item) === key ? { ...item, deviceCount: Math.min(99, Math.max(1, Math.trunc(quantity))) } : item));
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'OFF10') {
      setCouponCode('OFF10');
      if (new Set(cartItems.map(item => item.id)).size > 1) {
        return { success: true, message: 'Cupom OFF10 aplicado! Desconto de 10% ativo.' };
      } else {
        return {
          success: true,
          message: 'Cupom OFF10 inserido. Adicione mais um software para ativar os 10% de desconto!'
        };
      }
    }
    return { success: false, message: 'Cupom inválido.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  // Math calculations
  const subtotal = Math.round(cartItems.reduce((sum, item) => sum + itemTotal(item), 0) * 100) / 100;

  // Coupon OFF10 only applies when items count > 1
  const discountPercentage = (couponCode === 'OFF10' && cartItems.length > 1) ? 10 : 0;
  const discountAmount = Math.round(subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartAddVersion,
        isCartOpen,
        couponCode,
        subtotal,
        discountAmount,
        total,
        discountPercentage,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        setIsCartOpen,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
