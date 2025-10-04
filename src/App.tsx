import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoxProvider } from "./context/BoxContext";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import AddBox from "./pages/AddBox";
import BoxList from "./pages/BoxList";

type AppProps = {
  basename?: string;
};

export default function App({
  basename = (import.meta as any).env?.BASE_URL ?? "/",
}: AppProps) {
  return (
    <BrowserRouter basename={basename}>
      <BoxProvider>
        <div className="min-h-screen bg-neutral">
          <NavbarContainer />
          <Routes>
            <Route path="/" element={<AddBox />} />
            <Route path="/box-list" element={<BoxList />} />
          </Routes>
        </div>
      </BoxProvider>
    </BrowserRouter>
  );
}
