import Button from "./Button";
import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import Loader from "./Loader";
import CreateUser from "../features/user/CreateUser";

function Home() {
  const user = useSelector((state) => state.user.name);
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;

  return (
    <div className="relative my-12 flex flex-col items-center justify-stretch gap-7">
      <h1 className="text-center text-2xl font-semibold tracking-tight text-gray-700">
        The best pizza
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {user === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue Ordering, {user}
        </Button>
      )}
    </div>
  );
}

export default Home;
