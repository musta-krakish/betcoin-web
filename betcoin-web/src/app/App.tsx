import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages";
import { Store } from "@/pages/Store";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </>
  );
};

export default App;
