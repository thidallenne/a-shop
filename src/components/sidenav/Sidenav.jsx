import { Link } from 'react-router-dom'
import './sidenav.scss'
import 'primeicons/primeicons.css';

export default function Sidebar(){
    return (
        <>
                <div className="sidenav"> 
                    {/* <i className="pi pi-bookmark pinned-icon">
                    </i> */}
                    <div className="title-container">
                        <img src="favicon.ico" height="25"/>
                        <div className="title">
                            <span className="first">Alten Shop</span>
                        </div>
                    </div>   
                    <ul className="align-content-start">
                        <li>
                            <div className="li-container">
                                <Link className="sidenav-link" to={"/products"} >
                                    <i className="pi pi-shopping-cart menu-icon mr-3"></i>
                                    <span className="menu-title">Products</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="li-container">
                                <Link className="sidenav-link" to={"/admin/products"} >
                                    <i className="pi pi-users menu-icon mr-3"></i>
                                    <span className="menu-title">Admin</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
        </>
    )
}