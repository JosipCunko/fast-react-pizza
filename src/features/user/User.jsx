import { useSelector } from "react-redux";

function User() {
  const user = useSelector((state) => state.user.name);
  if (!user) return null;

  return (
    <p className="col-start-2 hidden text-lg font-semibold sm:inline-block">
      {user}
    </p>
  );
}

export default User;
