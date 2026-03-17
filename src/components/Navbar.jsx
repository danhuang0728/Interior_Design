import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
    { label: '關於我們', to: '/' },
    { label: '智能訂製全屋裝修', to: '/' },
    { label: '舊屋翻新與設計', to: '/' },
    { label: '預售屋設計', to: '/' },
]

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeMenu}>
                <span className="logo-icon"></span>
                <span className="logo-text">泰金閣設計裝修工作室</span>
            </Link>

            <button
                className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="切換選單"
            >
                <span />
                <span />
                <span />
            </button>

            <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        to={link.to}
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        {link.label}
                    </Link>
                ))}
                <NavLink
                    to="/inquiry"
                    className={({ isActive }) => `navbar-cta ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    線上詢問
                </NavLink>
            </nav>
        </header>
    )
}

export default Navbar
