import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Employers.module.css'

/* ── Scrolling ticker ── */
const TICKER_ITEMS = [
    'Professional Services', 'Media & Entertainment', 'Logistics',
    'Technology', 'Financial Services', 'Healthcare',
    'Retail & E-Commerce', 'Manufacturing',
]

/* ── Pipeline rows ── */
const PIPELINE = [
    { label: 'Applied', count: 248, pct: 100, color: '#6366f1' },
    { label: 'AI Screened', count: 186, pct: 75, color: '#4f46e5' },
    { label: 'AI Interview', count: 94, pct: 38, color: '#059669' },
    { label: 'Final Round', count: 22, pct: 15, color: '#f59e0b' },
    { label: 'Offer Sent', count: 8, pct: 5, color: '#10b981' },
]

/* ── How It Works steps ── */
const EMP_STEPS = [
    { num: '01', title: 'Upload Your JD', desc: 'Drop your existing JD document to instantly extract role requirements and key skills.' },
    { num: '02', title: 'Setup & Verify', desc: 'Verify your work email and complete your corporate profile to securely access your dashboard.' },
    { num: '03', title: 'Review & Publish', desc: 'Edit your AI-generated draft, verify the extracted details, and publish the role when ready.' },
    { num: '04', title: 'AI Screens Candidates', desc: 'Our AI matches and ranks applicants instantly based on your verified requirements.' },
]

/* ── Feature cards ── */
const FEATURES = [
    { icon: '🤖', title: 'AI Screening', desc: 'Automatically screen hundreds of resumes in seconds using context-aware AI matching.' },
    { icon: '🎙️', title: 'AI Interviews', desc: 'Conduct adaptive text-based AI interviews for every shortlisted candidate at scale.' },
    { icon: '📊', title: 'Smart Analytics', desc: 'Real-time dashboards on pipeline health, time-to-hire, match scores, and cost-per-hire.' },
    { icon: '🔗', title: 'One Platform', desc: 'From job posting to offer letter — no fragmented tools, no manual handoffs.' },
    { icon: '🛡️', title: 'Compliance Ready', desc: 'Built-in audit trails, GDPR-ready data flows, and role-based access controls.' },
    { icon: '⚡', title: 'Fast Deployment', desc: 'Get your first pipeline live in under an hour. No lengthy onboarding required.' },
]

export default function Employers() {
    const getInitialTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const [theme, setTheme] = useState(getInitialTheme())

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const updateTheme = (e) => setTheme(e.matches ? 'dark' : 'light')
        mediaQuery.addEventListener('change', updateTheme)
        return () => mediaQuery.removeEventListener('change', updateTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    return (
        <div className={styles.page}>

            {/* ── EMPLOYER NAVBAR ── */}
            <nav className={styles.enav}>
                <Link to="/" className={styles.enavLogo}>
                    <span>🧠</span>
                    <span className={styles.enavBrand}>SmartHire<span className={styles.enavAi}>AI</span></span>
                </Link>
                <div className={styles.enavRight}>
                    <Link to="/" className={styles.enavLink}>← Home</Link>
                    <button className={styles.enavIcon} style={{ outline: 'none' }} onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42
                           M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={styles.heroLeft}>
                    <div className={styles.badge}>✦ Corporate Hiring Platform</div>

                    <h1 className={styles.h1}>
                        Recruit Smarter,<br />
                        <span className={styles.accentLine}>10× Faster.</span>
                    </h1>

                    <p className={styles.sub}>
                        SmartHireAI unifies your entire recruitment workflow on one AI-powered
                        platform — from job posting to offer letter. Purpose-built for corporate
                        TA teams, in-house recruiters, and fast-growing organizations.
                    </p>

                    <div className={styles.heroBtns}>
                    </div>
                </div>

                {/* Pipeline card */}
                <div className={styles.pipelineCard}>
                    <div className={styles.pcHeader}>
                        <span className={styles.pcLabel}>Active Pipeline</span>
                        <span className={styles.pcLive}>+ Live</span>
                    </div>
                    <h3 className={styles.pcTitle}>Q1 2025 — Engineering</h3>
                    <div className={styles.pcRows}>
                        {PIPELINE.map(r => (
                            <div key={r.label} className={styles.pcRow}>
                                <span className={styles.pcRowLabel}>{r.label}</span>
                                <div className={styles.pcBar}>
                                    <div className={styles.pcBarFill} style={{ width: `${r.pct}%`, background: r.color }} />
                                </div>
                                <span className={styles.pcCount}>{r.count} candidates</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pcStats}>
                        <div className={styles.pcStat}>
                            <span className={styles.pcStatNum}>18 days</span>
                            <span className={styles.pcStatSub}>Avg time-to-hire</span>
                        </div>
                        <div className={styles.pcStat}>
                            <span className={styles.pcStatNum}>95%</span>
                            <span className={styles.pcStatSub}>Match Score</span>
                        </div>
                        <div className={styles.pcStat}>
                            <span className={styles.pcStatNum}>↓ 47%</span>
                            <span className={styles.pcStatSub}>Cost-per-Hire</span>
                        </div>
                    </div>
                    <div className={styles.pcNote}>
                        <span className={styles.pcNoteIcon}>💡</span>
                        AI just matched 3 top candidates for Senior SWE
                    </div>
                </div>
            </section>

            {/* ── SCROLLING TICKER ── */}
            <div className={styles.ticker}>
                <div className={styles.tickerTrack}>
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span key={i} className={styles.tickerItem}>
                            <span className={styles.tickerDot}>◆</span> {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── FEATURES ── */}
            <section className={styles.features}>
                <div className={styles.featuresInner}>
                    <p className={styles.featLabel}>✦ Platform Capabilities</p>
                    <h2 className={styles.featH2}>
                        Built for Corporate Recruiting<br />at Scale
                    </h2>
                    <p className={styles.featSub}>
                        Every feature is purpose-built for TA teams that need speed,
                        compliance, and data — not another tool to babysit.
                    </p>
                    <div className={styles.featGrid}>
                        {FEATURES.map(f => (
                            <div key={f.title} className={styles.featCard}>
                                <div className={styles.featIcon}>{f.icon}</div>
                                <h3 className={styles.featTitle}>{f.title}</h3>
                                <p className={styles.featDesc}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
