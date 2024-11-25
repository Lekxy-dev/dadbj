import Container from "../Component/Container";
import Formwrap from "../Component/FormWrap";
import CheckoutClient from "./checkoutClient";

const container = () => {
    return ( <div className="p-8">
       <Container>
         <Formwrap>
            <CheckoutClient/>
         </Formwrap>
       </Container>
    </div> );
}
 
export default container;