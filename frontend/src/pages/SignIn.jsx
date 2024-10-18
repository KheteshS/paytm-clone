import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white text-center w-80 p-2 px-4 h-max">
            <Heading label="Sign In" />
            <SubHeading label="Enter your credentials to access your account" />
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
                label={"Sign In"}
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      userName,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                }}
              />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
