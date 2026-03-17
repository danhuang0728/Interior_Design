import { useState } from 'react'
import './Navbar.css'

const navLinks = [
    { label: '關於我們', href: '#' },
    { label: '智能訂製全屋裝修', href: '#' },
    { label: '舊屋翻新與設計', href: '#' },
    { label: '預售屋設計', href: '#' },
    { label: '線上詢問', href: '#' },
]

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="navbar">
            {/* Logo 區塊（左上角） */}
            <a href="/" className="navbar-logo">
                <span className="logo-icon"></span>
                <span className="logo-text">泰金閣設計裝修工作室</span>
            </a>

            {/* 漢堡按鈕（手機版） */}
            <button
                className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>

            {/* 導覽選單（右上角） */}
            <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <a key={link.label} href={link.href} className="navbar-link">
                        {link.label}
                    </a>
                ))}
                <button className="navbar-search" aria-label="搜尋">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </nav>
        </header>
    )
}

export default Navbar
