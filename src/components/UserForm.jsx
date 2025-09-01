import { useEffect, useState } from "react";

export default function UserForm({ onSubmit, onCancel, user }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      // hvis der er en bruger (fx update), sæt værdierne i form
      user.name && setName(user.name);
      user.title && setTitle(user.title);
      user.mail && setMail(user.mail);
      user.image && setImage(user.image);
    }
  }, [user]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // FORM VALIDATION
    if (!name || !title || !mail) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    } else if (!mail.includes("@") || !mail.includes(".")) {
      alert("Please paste a valid email");
      return;
    }

    // hvis alt er valid → lav user-objekt
    const newUser = {
      name: name,
      title: title,
      mail: mail,
      image: image,
    };

    onSubmit(newUser); // send tilbage til parent
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        placeholder="Type a name"
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Type a title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="mail">Mail</label>
      <input
        id="mail"
        type="email" // RETTET: "mail" -> "email" (rigtig input type)
        value={mail}
        placeholder="Type an email"
        onChange={(e) => setMail(e.target.value)}
      />

      <label htmlFor="url">Image URL</label>
      <input
        id="url"
        type="url"
        value={image}
        placeholder="Paste image url"
        onChange={(e) => setImage(e.target.value)}
      />

      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={
          image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"
        }
        alt="Preview"
        onError={(e) =>
          (e.target.src =
            "https://placehold.co/600x400?text=Error+loading+image")
        }
      />

      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        {/* skift tekst alt efter om vi opdaterer eller opretter */}
        <button type="submit">{user ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
