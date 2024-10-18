import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white text-center w-80 p-2 px-4 h-max">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create your account" />
            <InputBox
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              label="First Name"
            />
            <InputBox
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              label="Last Name"
            />
            <InputBox
              onChange={(e) => setUserName(e.target.value)}
              placeholder="harkirat@gmail.com"
              label="Email"
            />
            <InputBox
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              label="Password"
            />
            <div className="pt-4">
              <Button
                label={"Sign Up"}
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      userName,
                      password,
                      firstName,
                      lastName,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                }}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
