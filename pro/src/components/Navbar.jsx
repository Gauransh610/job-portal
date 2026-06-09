import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
    { id: 'what', label: 'What You Get', href: '#what' },
    { id: 'how', label: 'How It Works', href: '#how' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
    const [active, setActive] = useState('what')
    const { theme, toggleTheme } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        const handleAuthChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        window.addEventListener('storage', handleAuthChange)
        window.addEventListener('auth-change', handleAuthChange)
        return () => {
            window.removeEventListener('storage', handleAuthChange)
            window.removeEventListener('auth-change', handleAuthChange)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }

    // Lock body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
                <span className={styles.logoIcon}>🧠</span>
                <span className={styles.logoWord}>
                    SmartHire<span className={styles.logoAi}>AI</span>
                </span>
            </Link>

            {/* Center links (desktop) */}
            <div className={styles.navLinks}>
                {NAV_LINKS.map(l => (
                    <a
                        key={l.id}
                        href={l.href}
                        className={`${styles.navA} ${active === l.id ? styles.active : ''}`}
                        onClick={() => setActive(l.id)}
                    >
                        {l.label}
                    </a>
                ))}
                {/* For Employers → navigates to /employers page */}
                <Link to="/employers" className={`${styles.navA} ${styles.pillEmployers}`}>
                    🏢 For Employers
                </Link>
            </div>

            {/* Right actions */}
            <div className={styles.navRight}>
                <span className={styles.divider} />
                {user ? (
                    <>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginRight: '16px' }}>Hi, {user.firstName || 'User'}</span>
                        <button onClick={handleLogout} className={styles.navA} style={{ outline: 'none', background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className={styles.navA}>Login</Link>
                        <Link to="/signup" className={styles.btnStarted}>
                            Get Started <span className={styles.arr}>→</span>
                        </Link>
                    </>
                )}
                <button className={styles.btnIcon} style={{ outline: 'none' }} onClick={toggleTheme} aria-label="Toggle Theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                {/* Hamburger (visible on tablet/mobile) */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            {/* ── Mobile drawer ── */}
            {menuOpen && (
                <>
                    <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} />
                    <div className={styles.mobileDrawer}>
                        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        {NAV_LINKS.map(l => (
                            <a
                                key={l.id}
                                href={l.href}
                                className={styles.mobileLink}
                                onClick={() => { setActive(l.id); setMenuOpen(false) }}
                            >
                                {l.label}
                            </a>
                        ))}
                        {user ? (
                            <button
                                onClick={() => {
                                    handleLogout()
                                    setMenuOpen(false)
                                }}
                                className={styles.mobileLink}
                                style={{ outline: 'none', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', paddingBottom: '0' }}
                            >
                                👋 Logout ({user.firstName})
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signin"
                                    className={styles.mobileLink}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className={styles.mobilePill}
                                    onClick={() => setMenuOpen(false)}
                                    style={{ background: 'linear-gradient(135deg, var(--cta), var(--cta-h))', color: '#ffffff' }}
                                >
                                    Get Started →
                                </Link>
                            </>
                        )}
                        <Link
                            to="/employers"
                            className={styles.mobilePill}
                            onClick={() => setMenuOpen(false)}
                        >
                            🏢 For Employers
                        </Link>
                        <button 
                            className={styles.mobileLink} 
                            style={{ outline: 'none', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', WebkitTapHighlightColor: 'transparent' }} 
                            onClick={toggleTheme}
                        >
                            {/* {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'} */}
                        </button>
                    </div>
                </>
            )}
        </nav>
    )
}
