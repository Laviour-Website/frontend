import React from 'react';
import {Navbar,Container,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./styles.css"
import img from "../../images/laviour.png"

const NavbarScroll=(props)=>{
    return (
        <Navbar className='py-3' style={{backgroundColor:props.bgColor,}} expand="lg">
          <Container fluid >
            <Navbar.Brand className="hidden md:inline md:ml-6" href="/"><img src={props.imgSrc}></img> </Navbar.Brand>
            <Navbar.Brand className="md:hidden" href="/"><img src={img}></img> </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            {/* <Navbar.Collapse id="navbarScroll"> */}
             
              <Link className='md:mr-10 rounded-2xl px-6 py-2 bg-[#fff] font-bold text-[14px] md:text-[18px]' to={props.buttonTo}>{props.buttonText}</Link>
            {/* </Navbar.Collapse> */}
          </Container>
        </Navbar>
    );
}

// export default NavbarScroll;

export default NavbarScroll;