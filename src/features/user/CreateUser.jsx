import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName } from "./userSlice";
import { useState } from "react";
import Button from "../../ui/Button";

function CreateUser() {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;
    dispatch(setName(fullName));
    setFullName("");
    navigate("/menu");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col items-center gap-4 text-center"
    >
      <label>👋 Welcome! Please start by telling us your name:</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input"
        placeholder="Your full name"
      />
      {fullName !== "" && <Button type="primary">Start ordering!</Button>}
    </form>
  );
}

export default CreateUser;
