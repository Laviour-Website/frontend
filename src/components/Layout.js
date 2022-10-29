import NavbarScroll from "./Navbar/Navbar";

const Layout=(props)=> {
    return ( 
        <>
        <NavbarScroll bgColor={props?.bgColor} imgSrc={props?.imgSrc} buttonText={props?.buttonText} buttonTo={props?.buttonTo}/>
        {props?.children}
        </>
     );
}

export default Layout;