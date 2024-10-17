import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const SignUp = () => {
  return (
    <>
      <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white text-center w-80 p-2 px-4 h-max">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create your account" />
            <InputBox placeholder="John" label="First Name" />
            <InputBox placeholder="Doe" label="Last Name" />
            <InputBox placeholder="harkirat@gmail.com" label="Email" />
            <InputBox placeholder="123456" label="Password" />
            <div className="pt-4">
              <Button label={"Sign Up"} />
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
