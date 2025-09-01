import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UserForm from "../components/UserForm";

export default function UpdatePage() {
  const { id } = useParams(); // henter brugerens id fra URL'en (fx /users/3)
  const navigate = useNavigate(); // bruges til at navigere til en ny side
  const [user, setUser] = useState({}); // state til den bruger der skal opdateres

  // Når siden loader, eller når id ændrer sig → hent bruger fra localStorage
  useEffect(() => {
    const data = localStorage.getItem("users"); // hent alle brugere fra localStorage
    const usersData = JSON.parse(data) || []; // parse string til array, eller tomt array hvis intet findes
    setUser(usersData.find((user) => user.id === id)); // find den bruger, som matcher id'et fra URL'en
  }, [id]); // kører hver gang id ændrer sig

  // Funktion til at opdatere en bruger
  async function updateUser(userToUpdate) {
    const data = localStorage.getItem("users"); // hent alle brugere fra localStorage
    const usersData = JSON.parse(data) || []; // parse til array

    // map gennem brugerne og udskift den med det rigtige id
    const updatedUsers = usersData.map((user) => {
      if (user.id === id) {
        // hvis id matcher, opdater data
        return { ...user, ...userToUpdate }; // behold alt fra user, men overskriv med de nye værdier
      }
      return user; // ellers returner uændret bruger
    });

    // gem det nye array med brugere i localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // naviger til den opdaterede brugers detail-side
    navigate(`/users/${id}`);
  }

  // Funktion til at annullere (tilbage til forrige side)
  function handleCancel() {
    navigate(-1); // -1 = gå én side tilbage i historikken
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        {/* UserForm får:
            - onSubmit → kalder updateUser, når man trykker "Save"
            - onCancel → kalder handleCancel, når man trykker "Cancel"
            - user → sender den valgte brugers data til formularen */}
        <UserForm onSubmit={updateUser} onCancel={handleCancel} user={user} />
      </div>
    </section>
  );
}
