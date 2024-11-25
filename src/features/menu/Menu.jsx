import { useLoaderData, useNavigation } from "react-router-dom";
import { getMenu } from "../../apiRestaurant";
import MenuItem from "./MenuItem";
import Loader from "../../ui/Loader";

function Menu() {
  const menu = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;
  return (
    <ul className="mx-auto divide-y divide-stone-300 divide-opacity-60 sm:max-w-[70vw] md:max-w-[50vw]">
      {menu.map((el) => (
        <MenuItem pizza={el} key={el.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
