import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Harkirat",
      lastName: "Singh",
      _id: 1,
    },
  ]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
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
          <Button label={"Send Money"} />
        </div>
      </div>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

export default Users;
