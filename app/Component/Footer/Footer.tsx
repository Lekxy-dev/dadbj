import Link from "next/link";
import Container from "../Container";
import FooterL from "./FooterL";
import { Redressed } from "next/font/google";
import {FaFacebook} from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Redress = Redressed({subsets: ["latin"], weight: ['400']})
const Footer = () => {
    return ( <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
               <FooterL>
               <h3 className="text-base font-bold mb-2">Shop Categories</h3>
                    <Link href="#">Phones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Watches</Link>
                    <Link href="#">Desktops</Link>
                    <Link href="#">Accesories</Link>
                    <Link href="#">Games</Link>
               </FooterL>
               <FooterL>
               <h3 className="text-base font-bold mb-2">Customer Services</h3>
                    <Link href="#">Contact Us</Link>
                    <Link href="#">Shipping Policy</Link>
                    <Link href="#">Return & Exchanges</Link>
                    <Link href="#">Watches</Link>
                    <Link href="#">FAQs</Link>
               </FooterL>
               <div className="w-full md:w-1/3 mb-6 md:mb-0">
               <h3 className="text-base font-bold mb-2">About Us</h3>
               <p className="mb-2">@dsquaregadget !!! Your one-stop shop for all things tech!
                 We offer the latest phones, laptops, gaming consoles, speakers,
                  and premium devices from top brands like Apple and Samsung. 
                  Upgrade your tech and gaming experience with us today!</p>
                  <p>&copy; {new Date().getFullYear()} <span className={`${Redress.className} font-bold text-2xl`}>Dsquare-Gadget.</span>All Rights Reserved</p>
               </div>
               <FooterL>
               <h3 className="text-base font-bold mb-2">Follow Us</h3>
               <Link href="https://www.facebook.com/dsquaregadgets/">
                <FaFacebook size={24}/>
               </Link>
               <Link href="https://x.com/dsquaregadget">
                <AiFillTwitterCircle size={24}/>
               </Link>
               <Link href="https://www.instagram.com/dsquaregadget/">
                <FaInstagram size={24}/>
               </Link>
               <Link href="#">
               <FaLinkedin size={24}/>
               </Link>
               </FooterL>
            </div>
        </Container>
    </footer> );
}
 
export default Footer;