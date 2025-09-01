import { useNavigate } from "react-router";

export default function User({ user }) {
  const navigate = useNavigate(); // bruges til navigation

  // Når man klikker på kortet → naviger til brugerens detail-side
  function handleClick() {
    navigate(`/users/${user.id}`);
  }

  // Hjælpefunktion til at udlede initialer fra email
  function getInitials() {
    // tag delen før "@" i mailen som initialer
    const initials = user.mail?.split("@")[0];
    return initials;
  }

  return (
    //  Hele bruger-kortet er klikbart
    <article className="user-card" onClick={handleClick}>
      {/*  Billede, fallback hvis der ikke findes et */}
      <img
        src={
          user.image || "https://placehold.co/600x400?text=Error+loading+image"
        }
        alt={user.name} // alt-tekst for tilgængelighed
      />

      {/*  Navn + initialer */}
      <h2>
        {user.name} ({user.mail ? getInitials() : "No initials"})
      </h2>

      {/* Titel, fallback hvis ukendt */}
      <p className="title">{user.title ? user.title : "Unknown Title"}</p>

      {/*  Email, klikbar mailto-link, fallback hvis ingen */}
      <p>
        {user.mail ? (
          <a href={`mailto:${user.mail}`}>{user.mail}</a>
        ) : (
          "No email"
        )}
      </p>
    </article>
  );
}
