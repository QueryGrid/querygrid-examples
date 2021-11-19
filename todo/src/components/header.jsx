import { Navbar } from "reactstrap";
import { Link, NavLink } from 'react-router-dom'

const styles = {
    navBrand: {fontSize: '25px', textDecoration: 'none', color: '#fff'},
    menuLink: {fontSize: '20px', textDecoration: 'none', color: '#fff'},
}

const Header = () => {
    return (
        <Navbar color="info" dark>
            <Link to="/" style={styles.navBrand}>QueryGrid</Link>

            <div>
                <NavLink to="/register" style={{...styles.menuLink, paddingRight: '10px'}}>
                    Register
                </NavLink>
                <NavLink to="/login" style={styles.menuLink}>
                    Login
                </NavLink>
            </div>
        </Navbar>
    )
}

export default Header