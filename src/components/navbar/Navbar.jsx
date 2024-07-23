import { Button } from 'primereact/button';
import './navbar.scss'
import { InputSwitch } from "primereact/inputswitch";
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


export default function Navbar(){

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);


    return(
        <>
            <div className="navbar app-navbar p-5">
                <div className="actions">
                    <div className=" flex justify-content-center pr-5">
                        <InputSwitch checked={isDarkMode} onChange={toggleTheme} />
                    </div>
                    <div className="user-button">
                        <span className='p-1'>John Doe</span>
                        <Button icon="pi pi-user" className="p-button-rounded p-button-outlined"/>
                    </div>
                </div>
            </div>
        </>
    )
}