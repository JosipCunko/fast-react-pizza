import { Link, useNavigate } from "react-router-dom";
import User from "../features/user/User";
import { useState } from "react";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <header className="flex items-center gap-7 bg-yellow-500 px-3 py-2">
      <Link
        to="/menu"
        className="mr-auto min-w-[10ch] text-sm font-semibold md:text-lg"
      >
        Fast React Pizza Co.
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search order #"
          className="input"
        />
      </form>

      <User />
    </header>
  );
}

export default Header;
