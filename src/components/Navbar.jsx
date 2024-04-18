import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {FaBars, FaMoon, FaRegSun} from "react-icons/fa";
import {IoClose} from "react-icons/io5";


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const routes = [["index.html", "Home"], ["about.html", "About"], ["services.html", "Services"]];

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
    const toggleLightMode = useCallback(() => {
        document.body.classList.toggle('dark-mode');
        setIsLightMode(prev => !prev);
    }, []);

    return (
        <Bar>
            <h1 onClick={() => (window.location.href = "index.html")}>YourTitle</h1>
            <Spacer/>
            <Options>
                {windowWidth <= 640 ? (
                    <>
                        <SwitchModeButton onClick={toggleLightMode}>
                            {isLightMode ? <FaRegSun size={20}/> : <FaMoon size={20}/>}
                        </SwitchModeButton>
                        {isMobileMenuOpen ? (
                            <IoClose size={20} onClick={toggleMenu}/>
                        ) : (
                            <FaBars size={20} onClick={toggleMenu}/>
                        )}
                        <MobileMenu className={isMobileMenuOpen ? "open" : ""}>
                            {routes.map(([path, label], index) => (
                                <NavLink key={index} href={path}>{label}</NavLink>
                            ))}
                        </MobileMenu>
                    </>
                ) : (
                    <>
                        {routes.map(([path, label], index) => (
                            <NavLink key={index} href={path}>{label}</NavLink>
                        ))}
                        <SwitchModeButton onClick={toggleLightMode}>
                            {isLightMode ? <FaRegSun size={20}/> : <FaMoon size={20}/>}
                        </SwitchModeButton>
                    </>
                )}
            </Options>
        </Bar>
    );
}

export default Navbar;

const Bar = styled.div`
    top: 0; left: 0; right: 0;
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction: row;
    height: 60px;
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: var(--box-shadow);
    font-weight: bold;
    font-size: 20px;
    padding: 20px;

    h1 {
        width: auto;
        font-size: 20px;
        cursor: pointer;
    }
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Options = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: auto;
`;

const MobileMenu = styled.div`
    display: none;
    flex-direction: column;
    position: absolute;
    text-align: center;
    top: 60px; left: 0; right: 0;
    background-color: var(--background-color);
    box-shadow: var(--box-shadow);
    padding: 10px;
    z-index: 9999;

    &.open {
        display: flex;
    }
`;

const NavLink = styled.a`
    color: var(--text-color);
    margin-right: 20px;
    font-size: 20px;
    text-decoration: none;

    @media only screen and (max-width: 640px) {
        margin: 20px;
    }
`;

const SwitchModeButton  = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100px;
    color: var(--text-color);
    margin-left: 20px;
`;
