import { useNavigate } from "react-router"; // bruges til at navigere til andre sider
import UserForm from "../components/UserForm"; // import af formular-komponenten

export default function CreatePage() {
  const navigate = useNavigate(); // hook til navigation

  // Funktion til at oprette en ny bruger
  async function createUser(newUser) {
    // lav et unikt id baseret på timestamp
    newUser.id = Date.now().toString();

    // hent eksisterende brugere fra localStorage
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || []; // hvis ingen data → tom array

    // tilføj den nye bruger til arrayet
    usersData.push(newUser);

    // gem arrayet tilbage i localStorage
    localStorage.setItem("users", JSON.stringify(usersData));

    // naviger tilbage til forsiden
    navigate("/");
  }

  // Funktion til annullering → gå tilbage til forrige side
  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Create New User</h1>

        {/* UserForm med onSubmit og onCancel */}
        <UserForm onSubmit={createUser} onCancel={handleCancel} />
      </div>
    </section>
  );
}
