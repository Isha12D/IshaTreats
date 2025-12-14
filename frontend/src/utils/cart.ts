/* -------- Cart Item Type -------- */
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/* -------- Constants -------- */
const CART_KEY = "cart";

/* -------- Helpers -------- */
export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated")); // 🔥 notify navbar
};

export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const getItemQuantity = (id: string): number => {
  const item = getCart().find((i) => i._id === id);
  return item ? item.quantity : 0;
};

/* -------- Cart Actions -------- */

// Add / increase
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

// Decrease / remove
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
