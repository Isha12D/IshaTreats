import { getUserId } from "./auth";

/* -------- Cart Item Type -------- */
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/* -------- Helpers -------- */

// 🔥 user-specific cart key (FIXED)
const getCartKey = (): string => {
  const userId = getUserId();
  return userId ? `cart_${userId}` : "cart_guest";
};

export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem(getCartKey()) || "[]");
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const getItemQuantity = (id: string): number => {
  const item = getCart().find((i) => i._id === id);
  return item ? item.quantity : 0;
};

/* -------- Cart Actions -------- */

export const addToCart = (
  item: Omit<CartItem, "quantity">
) => {
  const cart = getCart();
  const existing = cart.find((c) => c._id === item._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
};

export const decreaseFromCart = (id: string) => {
  let cart = getCart();
  const existing = cart.find((c) => c._id === id);

  if (!existing) return;

  if (existing.quantity === 1) {
    cart = cart.filter((c) => c._id !== id);
  } else {
    existing.quantity -= 1;
  }

  saveCart(cart);
};
