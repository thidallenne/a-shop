import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation } from 'react-router-dom';
import { Link, Link as RouterLink} from 'react-router-dom'

export default function Header(){
    const location = useLocation();
    let currentLink= '';

    const crumbs = location.pathname.split('/');
    currentLink = crumbs[1].charAt(0).toUpperCase() + crumbs[1].slice(1);

    const items = [
        { label: currentLink,
            template: () => <Link as={RouterLink} className="no-underline" to={location.pathname}>{currentLink}</Link>
            //url:location.pathname
         },
    ];
    
    const home = { label: 'Home',
        template: () => <Link as={RouterLink} className="no-underline" to={'/'}>Home</Link>
     }

    return(
        <div className="app-header">
            <BreadCrumb model={items} home={home}/>        
        </div>
    )
}