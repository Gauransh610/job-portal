import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignUp.module.css'

const ROLES = ['Job Seeker']

export default function SignUp() {
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [role, setRole] = useState('Job Seeker')
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '', company: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match')
        }
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Signup failed')
            navigate('/signin')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSocialLogin = async (provider) => {
        setLoading(true)
        setError('')
        try {
            const oauthData = {
                provider,
                firstName: provider,
                lastName: 'User',
                email: `user@${provider.toLowerCase()}.com`
            }
            
            const res = await fetch('/api/oauth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(oauthData)
            })
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Social login failed')
            
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
            window.dispatchEvent(new Event('auth-change'))
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.root}>
            {/* Left panel — decorative scrollable info */}
            <div className={styles.left}>
                <div className={styles.leftInner}>
                    <div className={styles.brand}>
                        <span className={styles.brandIcon}>🧠</span>
                        <span className={styles.brandName}>SmartHire<span className={styles.brandAi}>AI</span></span>
                    </div>
                    <h2 className={styles.leftHeading}>
                        Your next great hire<br />starts here.
                    </h2>
                    <p className={styles.leftSub}>
                        Join thousands of companies and professionals using SmartHireAI
                        to streamline recruiting with the power of agentic AI.
                    </p>
                    <ul className={styles.perks}>
                        {[
                            { icon: '⚡', text: 'Get your first pipeline live in under an hour' },
                            { icon: '🤖', text: 'AI screening and ranking — zero manual work' },
                            { icon: '📊', text: 'Real-time analytics and pipeline health tracking' },
                            { icon: '🛡️', text: 'GDPR-ready, secure, and compliance-first' },
                        ].map(p => (
                            <li key={p.text} className={styles.perk}>
                                <span className={styles.perkIcon}>{p.icon}</span>
                                <span>{p.text}</span>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.socialRow}>
                        {['Google', 'LinkedIn', 'GitHub'].map(s => (
                            <span key={s} className={styles.socialBadge}>{s}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel — scrollable form */}
            <div className={styles.right}>
                <div className={styles.card}>
                    {/* Lock icon */}
                    <div className={styles.iconWrap}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>

                    <h1 className={styles.heading}>Create Account</h1>
                    <p className={styles.sub}>Join SmartHireAI and get started in minutes</p>

                    {/* Role toggle */}
                    <div className={styles.roleToggle}>
                        {ROLES.map(r => (
                            <button
                                key={r}
                                type="button"
                                className={`${styles.roleBtn} ${role === r ? styles.roleActive : ''}`}
                                onClick={() => setRole(r)}
                            >{r}</button>
                        ))}
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', background: '#fee2e2', padding: '12px', borderRadius: '8px' }}>{error}</div>}
                        {/* Name row */}
                        <div className={styles.row2}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>First Name</label>
                                <div className={styles.inputWrap}>
                                    <span className={styles.inputIcon}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} placeholder="John" required />
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Last Name</label>
                                <div className={styles.inputWrap}>
                                    <span className={styles.inputIcon}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} placeholder="Doe" required />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Email Address</label>
                            <div className={styles.inputWrap}>
                                <span className={styles.inputIcon}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <polyline points="2,4 12,13 22,4" />
                                    </svg>
                                </span>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="you@example.com" required />
                            </div>
                        </div>

                        {/* Company (show only for employer) */}
                        {role === 'Employer / Recruiter' && (
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Company Name</label>
                                <div className={styles.inputWrap}>
                                    <span className={styles.inputIcon}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <rect x="2" y="7" width="20" height="14" rx="2" />
                                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                        </svg>
                                    </span>
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} className={styles.input} placeholder="Acme Corp" required />
                                </div>
                            </div>
                        )}

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
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Create a password"
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

                        {/* Confirm Password */}
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Confirm Password</label>
                            <div className={styles.inputWrap}>
                                <span className={styles.inputIcon}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Repeat your password"
                                    required
                                />
                                <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(p => !p)} aria-label="Toggle confirm password">
                                    {showConfirm ? (
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

                        {/* Terms */}
                        <label className={styles.checkRow}>
                            <input type="checkbox" className={styles.checkbox} required />
                            <span className={styles.checkText}>
                                I agree to the <Link to="/terms" className={styles.checkLink}>Terms of Service</Link> and{' '}
                                <Link to="/privacy" className={styles.checkLink}>Privacy Policy</Link>
                            </span>
                        </label>

                        <button type="submit" disabled={loading} className={styles.signUpBtn}>
                            {loading ? 'Creating...' : 'Create Account →'}
                        </button>

                        <div className={styles.divider}><span>or continue with</span></div>

                        <div className={styles.oauthRow}>
                            {[
                                { name: 'Google', emoji: '🔵' },
                                { name: 'LinkedIn', emoji: '🔷' },
                                { name: 'GitHub', emoji: '⚫' },
                            ].map(o => (
                                <button 
                                    key={o.name} 
                                    type="button" 
                                    className={styles.oauthBtn}
                                    onClick={() => handleSocialLogin(o.name)}
                                    disabled={loading}
                                >
                                    <span>{o.emoji}</span> {o.name}
                                </button>
                            ))}
                        </div>
                    </form>

                    <p className={styles.switchText}>
                        Already have an account?{' '}
                        <Link to="/signin" className={styles.switchLink}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
