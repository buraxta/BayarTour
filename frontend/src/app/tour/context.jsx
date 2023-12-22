"use client";
import { createContext, useState } from "react";
export const cx = createContext({
  globalState: {},
  setGlobalState: () => {},
});

export default function Context({ children }) {
  const [globalState, setGlobalState] = useState(-1);

  return (
    <div>
      <cx.Provider value={{ globalState, setGlobalState }}>
        {children}
      </cx.Provider>
    </div>
  );
}
