import { Route, Routes } from "react-router"; // import Routes og Route til routing
import HomePage from "./Pages/HomePage"; // forsiden
import CreatePage from "./Pages/CreatePage"; // side til at oprette ny bruger
import NavBar from "./components/NavBar"; // navigation bar
import UserDetailPage from "./pages/UserDetailPage"; // vis detaljer for en bruger
import UserUpdatePage from "./pages/UserUpdatePage"; // opdater bruger

function App() {
  return (
    // Hoved-container for app'en
    <main className="app">
      {/* Navigation bar vises på alle sider */}
      <NavBar />

      {/* Definerer alle routes */}
      <Routes>
        {/* Forside */}
        <Route path="/" element={<HomePage />} />

        {/* Opret ny bruger */}
        <Route path="/create" element={<CreatePage />} />

        {/* Vis brugerens detaljer (UserDetailPage) */}
        <Route path="/users/:id" element={<UserDetailPage />} />

        {/* Update bruger */}
        <Route path="/users/:id/update" element={<UserUpdatePage />} />
      </Routes>
    </main>
  );
}

export default App;
