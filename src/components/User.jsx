export default function User({ name, image, title, mail }) {
  return (
    <article className="user-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p className="title">{title}</p>
      <p>
        <a href={`mailto:${mail}`}>{mail}</a>
      </p>
    </article>
  );
}
