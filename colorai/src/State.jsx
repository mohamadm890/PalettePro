import React, { useState } from "react";
import create from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: async () => {
    await signOut(auth);
    set({ isLoggedIn: true });
  },
}));

export default useState;
