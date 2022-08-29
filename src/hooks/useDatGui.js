import React, { createContext, useContext, useState } from "react";
import DatGui, { DatColor } from "react-dat-gui";

const initialState = {
  backgroundColor: "#000000",
};

const DatContext = createContext(initialState);

export const DatProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const handleUpdate = (newData) => {
    setState((prevState) => ({ ...prevState, ...newData }));
  };

  return (
    <DatContext.Provider value={{ state, setState }}>
      <DatGui data={state} onUpdate={handleUpdate}>
        {/* <DatString path="package" label="Package" />
        <DatNumber path="power" label="Power" min={9000} max={9999} step={1} />
        <DatBoolean path="isAwesome" label="Awesome?" /> */}
        <DatColor path="backgroundColor" label="Background" />
      </DatGui>
      {children}
    </DatContext.Provider>
  );
};

export default function useDatGui() {
  const value = useContext(DatContext);

  if (!value) {
    throw new Error("Please define `DatProvider` higher up");
  }

  return value;
}
