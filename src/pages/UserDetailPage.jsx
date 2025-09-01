import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import User from "../components/User";

export default function UserUpdatePage() {
  const [user, setUser] = useState({}); // state til den bruger der vises
  const { id } = useParams(); // henter brugerens id fra URL’en (fx /users/3)
  const navigate = useNavigate(); // bruges til navigation

  // Når komponenten loader → hent brugeren fra localStorage
  useEffect(() => {
    const data = localStorage.getItem("users"); // hent alle brugere fra localStorage
    const usersData = JSON.parse(data) || []; // parse string til array (eller tomt array hvis intet findes)

    // find den bruger, der matcher id fra URL’en
    const foundUser = usersData.find((u) => u.id.toString() === id);

    // hvis brugeren findes, gem den i state
    if (foundUser) {
      setUser(foundUser);
    }
  }, [id]); // kører hver gang id ændrer sig

  // Viser en "er du sikker"-dialog før sletning
  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${user.name}"?`
    );
    if (shouldDelete) {
      deleteUser();
    }
  }

  // Funktion til at slette bruger
  function deleteUser() {
    const data = localStorage.getItem("users"); // hent alle brugere
    const usersData = JSON.parse(data) || [];

    // filtrer brugeren ud baseret på id
    const updatedUsers = usersData.filter((u) => u.id.toString() !== id);

    // gem den nye liste i localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // naviger tilbage til forsiden
    navigate("/");
  }

  // Funktion til at navigere til update-siden
  function showUpdate() {
    navigate(`/users/${id}/update`);
  }

  return (
    <section id="user-page" className="page">
      <div className="container">
        {/* viser brugerens navn */}
        <h1>{user.name}</h1>

        {/* viser brugerens info med User-komponenten */}
        <User user={user} />

        {/* knapper til slet og opdater */}
        <div className="btns">
          <button className="btn-cancel" onClick={showDeleteDialog}>
            Delete user
          </button>
          <button onClick={showUpdate}>Update user</button>
        </div>
      </div>
    </section>
  );
}
