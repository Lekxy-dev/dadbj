import Container from "../Component/Container";
import CartClient from "./CartClient";

const cart = () => {
    return <div className="pt-8 ">
        <Container>
            <CartClient />
        </Container>
        </div> 
}
 
export default cart;