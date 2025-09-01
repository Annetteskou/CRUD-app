import { NavLink } from "react-router"; // import NavLink fra react-router

export default function NavBar() {
  return (
    //  Navigation bar
    <nav>
      {/*  Link til forsiden */}
      <NavLink to="/">Home</NavLink>

      {/*  Link til opret-bruger-siden */}
      <NavLink to="/create">Create</NavLink>
    </nav>
  );
}
