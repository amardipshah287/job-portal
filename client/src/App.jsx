import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index";
import OntoTop from "./common/OntoTop";

function App() {
  return (
    <>
      <OntoTop />
      <Header />
      <main className="min-h-[calc(100vh-100px)] max-w-[1536px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
