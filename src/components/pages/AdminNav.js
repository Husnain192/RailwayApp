import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from '../Button';
import '../Navbar.css';
import { useNavigate } from 'react-router';

function AdminNav() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [ADMIN_NAME, setAdminName] = useState('');
    const [ADMIN_KEY, setAdminKey] = useState('');
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
        setAdminName("");
        setAdminKey("");
        goToAdminLogin();
      };

    const goToAdminLogin = () =>{
        navigate("/AdminLogin");
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
      <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/AdminHome" className="navbar-logo" onClick={closeMobileMenu}>
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
                        <Link to='/AddTrain' className='nav-links' onClick={closeMobileMenu}>
                            Add Train
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ModifyTrain' className='nav-links' onClick={closeMobileMenu}>
                            Modify Train
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ViewTrain' className='nav-links' onClick={closeMobileMenu}>
                            View All Trains
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ViewBook' className='nav-links' onClick={closeMobileMenu}>
                            View Booked Tickets
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ViewFeedback' className='nav-links' onClick={closeMobileMenu}>
                            View Feebacks
                        </Link>
                    </li>

                </ul>
                <Button buttonStyle='btn--outline' onClick={handleLogout}>Logout</Button>
            </div>
        </nav>
      </>
    )
}

export default AdminNav;
