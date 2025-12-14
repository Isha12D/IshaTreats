export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserId = (): string | null => {
  const user = getUser();
  return user?._id || user?.id || null;
};

export const logout = () => {
  // ❌ DO NOT delete cart here
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // 🔥 force cart refresh in UI
  window.dispatchEvent(new Event("cartUpdated"));
};
