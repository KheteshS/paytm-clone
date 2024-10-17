import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const SignIn = () => {
  return (
    <>
      <AppBar />
      <Balance value={0} />
      <Users />
      <h1>Sign In</h1>
    </>
  );
};

export default SignIn;
