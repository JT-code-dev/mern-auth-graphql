import SignupForm from "../components/SignupForm";
import { Container } from "react-bootstrap";

const Signup = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center">Sign Up</h2>
      <SignupForm />
    </Container>
  );
};

export default Signup;
