import Container from "@/app/Component/Container";
import Formwrap from "@/app/Component/FormWrap";
import Loginform from "./LoginForm";
import { getCurrentUser } from "@/actions/getCurrentUser";


const Login = async() => {
    const currentUser = await getCurrentUser()
    return ( <Container>
        <Formwrap>
            <Loginform currentUser = {currentUser}/>
        </Formwrap>
    </Container> );
}
 
export default Login;