import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import { useNavigate } from 'react-router';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [EMAIL, setEmail] = useState('');
const [PASSWORD, setPassword] = useState('');
const [user, setUser] = useState();
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const closeMobileMenu  = () => setClick(!click);

    const showButton = ()=>{
        if(window.innerWidth <= 960){
            setButton(false);
        }
        else{
            setButton(true);
        }
    };

    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
        goToLogin();
      };

    const goToLogin = () =>{
        navigate("/");
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
      <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    MetroRailway <i className="fab fa-typo3" />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {/* <li className="nav-item">
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                            Services
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ticket' className='nav-links' onClick={closeMobileMenu}>
                            My Tickets
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            Contact Us
                        </Link>
                    </li>
                </ul>
                <Button buttonStyle='btn--outline' onClick={handleLogout}>Logout</Button>
            </div>
        </nav>
      </>
    )
}

export default Navbar;
