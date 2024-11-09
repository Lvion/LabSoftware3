// NavBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaGift } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiFileList3Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    const closeSidebarOnClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {isMobile && (
                <button className="hamburger-btn" onClick={toggleSidebar}>
                    <GiHamburgerMenu />
                </button>
            )}

            <nav className={`sidebar ${isOpen || !isMobile ? 'open' : ''}`}>
                <h2>Menu</h2>
                <ul className='nav-links'>
                    <li className={location.pathname === '/student' ? 'active' : ''}>
                        <Link to="/student" onClick={closeSidebarOnClick}>
                            <FaHome /> Página Inicial
                        </Link>
                    </li>
                    <li className={location.pathname === '/benefits' ? 'active' : ''}>
                        <Link to="/benefits" onClick={closeSidebarOnClick}>
                            <FaGift /> Benefícios
                        </Link>
                    </li>
                    <li className={location.pathname === '/extract' ? 'active' : ''}>
                        <Link to="/extract" onClick={closeSidebarOnClick}>
                            <RiFileList3Fill /> Extrato
                        </Link>
                    </li>
                </ul>

                <div className="nav-bottom-links">
                    <p>OUTROS</p>
                    <ul>
                        <li className={`${location.pathname === '/settings' ? 'active' : ''} bottom-link settings-link`}>
                            <Link to="/settings" onClick={closeSidebarOnClick}>
                                <FaGear /> Configurações
                            </Link>
                        </li>
                        <li className="logout bottom-link">
                            <button onClick={handleLogout}>
                                <IoLogOut /> Sair
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
