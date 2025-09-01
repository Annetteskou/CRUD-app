import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state til alle brugere
  const [searchTerm, setSearchTerm] = useState(""); // state til søgefelt
  const [filter, setFilter] = useState(""); // RETTET: setfilter -> setFilter (camelCase)
  const [sort, setSort] = useState("name"); // state til sortering

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // hent fra localStorage

      let usersData = [];

      if (data) {
        // Hvis data findes i localStorage
        usersData = JSON.parse(data);
      } else {
        // Ellers fetch fra API
        usersData = await fetchUsers();
      }

      // Sortér default efter name
      usersData.sort((user1, user2) => user1.name.localeCompare(user2.name));

      setUsers(usersData); // gem i state
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
    ); // hent data fra API
    const data = await response.json(); // parse JSON
    localStorage.setItem("users", JSON.stringify(data)); // gem i localStorage
    return data; // returnér til brug i getUsers
  }

  // Filtrér først på søgeterm (name)
  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find alle unikke titler til filter-dropdown
  const titles = [...new Set(users.map((user) => user.title))];

  // Hvis filter er valgt, filtrér brugere yderligere
  if (filter !== "") {
    filteredUsers = filteredUsers.filter((user) => user.title === filter);
  }

  // RETTET: sortBy -> sort (da state hedder sort, ikke sortBy)
  filteredUsers.sort((user1, user2) => user1[sort].localeCompare(user2[sort]));

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Name{" "}
          <input
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <label>
          Filter by Title
          {/* RETTET: setfilter -> setFilter */}
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select title</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          {/* RETTET: setSortBy -> setSort */}
          <select name="sort-by" onChange={(e) => setSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="title">Title</option>
            <option value="mail">Mail</option>
          </select>
        </label>
      </form>

      <section className="grid">
        {filteredUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
