import {NavLink} from "react-router-dom";

export const Navigation = () => {
    return <nav className="navbar justify-content-center navbar-expand-sm bg-light">
        <ul className="navbar-nav">
             <li className="nav-item">
                <NavLink className="nav-link" to="/">Form Build</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
        </ul>
    </nav>
}