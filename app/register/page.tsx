import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../Component/Container";
import Formwrap from "../Component/FormWrap";
import Registerform from "./RegisterForm";

const Register = async () => {
    const currentUser = await getCurrentUser();
    return ( <Container>
        <Formwrap>
            <Registerform currentUser = {currentUser}/>
        </Formwrap>
    </Container> );
}
 
export default Register;