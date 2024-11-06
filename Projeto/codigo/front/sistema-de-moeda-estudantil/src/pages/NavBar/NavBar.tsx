import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGift } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiFileList3Fill } from "react-icons/ri";

import './NavBar.css';

function NavBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
                <ul>
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
                    <li className={location.pathname === '/settings' ? 'active' : ''}>
                        <Link to="/settings" onClick={closeSidebarOnClick}>
                            <FaGear /> Configurações
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;
