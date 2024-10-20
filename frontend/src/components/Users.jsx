import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Harkirat",
      lastName: "Singh",
      _id: 1,
    },
  ]);

  const [filter, setFilter] = useState("");
  const debouncedValue = useDebounce(filter, 500);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedValue)
      .then((res) => {
        setUsers(res.data.users);
      });
  }, [debouncedValue]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex justify-center items-center mr-2 mt-1">
            <div className="text-xl">{user.firstName[0]}</div>
          </div>
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>

        <div>
          <Button
            label={"Send Money"}
            onClick={() => {
              navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}
          />
        </div>
      </div>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

export default Users;
