import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DotPattern from '../components/DotPattern'
import styles from './SignIn.module.css'

export default function SignIn() {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Sign in failed')

            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
            
            // Notify other components like Navbar about the auth change
            window.dispatchEvent(new Event('auth-change'))
            
            navigate('/') // Redirect Home as requested
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.root}>
            {/* Blurred backdrop — shows the page behind */}
            <div className={styles.backdrop} onClick={() => navigate(-1)} />
            <DotPattern />

            {/* Modal card */}
            <div className={styles.card}>
                {/* Close button */}
                <button className={styles.close} onClick={() => navigate(-1)} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Lock icon */}
                <div className={styles.iconWrap}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                <h1 className={styles.heading}>Welcome Back</h1>
                <p className={styles.sub}>Sign in to your account to continue</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', background: '#fee2e2', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}
                    {/* Email */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Email Address</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.inputIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <polyline points="2,4 12,13 22,4" />
                                </svg>
                            </span>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                            <span className={styles.inputRight}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.inputIcon}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="password"
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />
                            <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(p => !p)} aria-label="Toggle password">
                                {showPass ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={styles.forgotRow}>
                        <Link to="/forgot-password" className={styles.forgot}>Forgot password?</Link>
                    </div>

                    <button type="submit" disabled={loading} className={styles.signInBtn}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className={styles.switchText}>
                    Don't have an account?{' '}
                    <Link to="/signup" className={styles.switchLink}>Sign up</Link>
                </p>
            </div>
        </div>
    )
}
