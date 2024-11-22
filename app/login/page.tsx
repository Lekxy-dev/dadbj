import Container from "@/app/Component/Container";
import Formwrap from "@/app/Component/FormWrap";
import Loginform from "./LoginForm";


const Login = () => {
    return ( <Container>
        <Formwrap>
            <Loginform />
        </Formwrap>
    </Container> );
}
 
export default Login;