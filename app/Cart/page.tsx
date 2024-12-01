import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../Component/Container";
import CartClient from "./CartClient";

const cart = async() => {
    const currentUser = await getCurrentUser()
    return <div className="pt-8 ">
        <Container>
            <CartClient  currentUser={currentUser}/>
        </Container>
        </div> 
}
 
export default cart;