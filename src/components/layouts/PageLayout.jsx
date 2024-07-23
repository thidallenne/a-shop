import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import Sidenav from "../sidenav/Sidenav";

export default function PageLayout({ children }){
    return (
        <>
            
            <div className="app-container">
                <Sidenav/>
                <div className="app-right">
                    <Navbar/>
                    <Header/>
                    <div className="app-frame">
                        {children}
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}