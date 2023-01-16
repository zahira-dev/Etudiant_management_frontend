import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function NewStudent() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [mark, setMark] = useState<number>(0);
  const [option, selectedOption] = useState<string>("");
  const addStudent = async () => {
    console.log(firstName);
    console.log(mark);
    console.log("jsonn", JSON.stringify({ firstName, mark, option }));
    const response = await axios.post("http://localhost:8081/students/new", {
      firstName,
      mark,
      option,
    });

    if (response.status === 200) {
      toast.success("Successfully added!");
      navigate("/");
    } else {
      toast.error("cant add this object");
    }
  };

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = ( event
    ) => {
    setFirstName(event.target.value);
    console.log(event.target.value);
  };
  const handleOption: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    console.log("Label ", event.target.selectedOptions[0].label);
    console.log(event.target.value);
    selectedOption(event.target.value);
  };
  const handleChangeMark: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const n = Number(event.target.value);

    setMark(n);
  };
  return (
    <Layout>
      <>
        <div>
          <label htmlFor="name">
            {" "}
            Saisissez le nom complet:
            <input
              id="name"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChangeName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="note">
            {" "}
            Saisissez la note:
            <input
              id="note"
              type="number"
              name="mark"
              onChange={handleChangeMark}
              value={mark}
            />
          </label>
        </div>
        <div>
          <label htmlFor="option">
            {" "}
            Choisissez la filière:
            <select id="option" value={option} onChange={handleOption}>
              <option value="Miage">Miage</option>
              <option value="genie civil">génie Civil</option>
              <option value="Genie indus">Génie Industriel</option>
              <option value="genie mecanique">Génie mécanique</option>
            </select>
          </label>
          <div>
            {" "}
            <button
              style={{ padding: 10, marginLeft: 10 }}
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel{" "}
            </button>
            <button
              style={{ padding: 10, marginLeft: 10 }}
              type="button"
              onClick={() => addStudent()}
            >
              Save{" "}
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default NewStudent;
