import styled from 'styled-components';
import {useEffect, useState} from "react";
import {FaBars} from "react-icons/fa6";
import {IoClose} from "react-icons/io5";
import {FaMoon, FaRegSun} from "react-icons/fa";
import ReactDOM from "react-dom/client";


const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [title] = useState("YourTitle");
    const [routes] = useState([["index.html", "Home"], ["about.html", "About"], ["services.html", "Services"], ["services.html", "Services"]]);
    const [showMenu, setShowMenu] = useState(false);
    const [lightMode, switchLightMode] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTitleClick = () => {
        window.location.href = "index.html";
    }

    const handleMenuOpen = () => {
        setShowMenu(!showMenu);
    };

    const toggleLightMode = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        switchLightMode(!lightMode);
    };

    return (
        <Bar>
            <h1 onClick={handleTitleClick}>{title}</h1>
            <Spacer></Spacer>
            <Options>
                {routes.length > 3 && windowWidth < 640 ?
                    <Mobile>
                        <SwitchDarkLightMode>
                            {lightMode && <FaRegSun onClick={toggleLightMode} size={20}/>}
                            {!lightMode && <FaMoon onClick={toggleLightMode} size={20}/>}
                        </SwitchDarkLightMode>
                        {!showMenu && <FaBars onClick={handleMenuOpen} size={20}/>}
                        {showMenu && <IoClose onClick={handleMenuOpen} size={20}/>}
                        <MobileMenu className={showMenu ? "open" : ""}>
                            {routes.map((route, index) => (
                                <a key={index} href={route[0]}>{route[1]}</a>
                            ))}
                        </MobileMenu>
                    </Mobile>
                    :
                    <>
                        {routes.map((route, index) => (
                            <a key={index} href={route[0]}>{route[1]}</a>
                        ))}
                        <SwitchDarkLightMode>
                            {lightMode && <FaRegSun onClick={toggleLightMode} size={20}/>}
                            {!lightMode && <FaMoon onClick={toggleLightMode} size={20}/>}
                        </SwitchDarkLightMode>
                    </>
                }
            </Options>
        </Bar>
    )
}

export default Navbar;

const Bar = styled.div`
    top: 0;
    left: 0;
    right: 0;
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
    width: 100%;
`;

const Options = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: auto;

    a {
        margin-right: 20px;
        text-decoration: none;
        color: var(--text-color);
    }
`;

const Mobile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--text-color);
`;

const MobileMenu = styled.div`
    display: none;
    flex-direction: column;
    position: absolute;
    text-align: center;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--background-color);
    box-shadow: var(--box-shadow);
    padding: 10px;
    z-index: 9999;

    a {
        color: var(--text-color);
        text-decoration: none;
        font-size: 20px;
        margin: 10px;
    }

    &.open {
        display: flex;
    }
`;

const SwitchDarkLightMode = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100px;
    color: var(--text-color);
    margin-left: 20px;
`;
