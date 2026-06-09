import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const PRODUCT = [
    { label: 'How it works', href: '/#how', isHash: true },
    { label: 'What you get', href: '/#what', isHash: true },
]

const SUPPORT = [
    { label: 'FAQ', href: '/#faq', isHash: true },
    { label: 'Contact', href: '/contact', isHash: false },
]

const LEGAL = [
    { label: 'Privacy policy', href: '/privacy', isHash: false },
    { label: 'Terms of service', href: '/terms', isHash: false },
    // Refund Policy removed per request
]

const SOCIAL = [
    { label: 'Chat', svg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
    { label: 'Telegram', svg: <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /> },
    { label: 'Facebook', svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
    { label: 'Instagram', svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></> },
    { label: 'Twitter', svg: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.34 4.07 3.58 1.64.9a4.5 4.5 0 0 0-.61 2.27 4.5 4.5 0 0 0 2 3.75 4.48 4.48 0 0 1-2.05-.56v.06c0 2.18 1.55 4 3.6 4.42a4.52 4.52 0 0 1-2.04.08 4.53 4.53 0 0 0 4.23 3.13A9.05 9.05 0 0 1 0 17.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z" /> },
]

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                {/* Brand column */}
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🧠</span>
                        <span className={styles.logoWord}>
                            SmartHire<span className={styles.logoAi}>AI</span>
                        </span>
                    </div>
                    <p className={styles.tagline}>
                        Empowering careers with intelligent AI — built for real hiring outcomes.
                    </p>
                </div>

                {/* Product */}
                <div className={styles.col}>
                    <h4 className={styles.colHead}>Product</h4>
                    {PRODUCT.map(l => (
                        l.isHash ? (
                            <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
                        ) : (
                            <Link key={l.label} to={l.href} className={styles.link}>{l.label}</Link>
                        )
                    ))}
                </div>

                {/* Support */}
                <div className={styles.col}>
                    <h4 className={styles.colHead}>Support</h4>
                    {SUPPORT.map(l => (
                        l.isHash ? (
                            <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
                        ) : (
                            <Link key={l.label} to={l.href} className={styles.link}>{l.label}</Link>
                        )
                    ))}
                </div>

                {/* Legal */}
                <div className={styles.col}>
                    <h4 className={styles.colHead}>Legal</h4>
                    {LEGAL.map(l => (
                        l.isHash ? (
                            <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
                        ) : (
                            <Link key={l.label} to={l.href} className={styles.link}>{l.label}</Link>
                        )
                    ))}
                </div>

                {/* Quick preview card */}
                <div className={styles.preview}>
                    <p className={styles.previewTitle}>Quick preview</p>
                    <p className={styles.previewText}>
                        Resume → report → assessments conducted via AI text interviews.
                    </p>
                    <div className={styles.previewTags}>
                        {['Role match', 'Skill gaps', 'Interview readiness'].map(t => (
                            <span key={t} className={styles.previewTag}>{t}</span>
                        ))}
                    </div>
                    <div className={styles.socials}>
                        {SOCIAL.map(s => (
                            <a key={s.label} href="#" aria-label={s.label} className={styles.social}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {s.svg}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bar}>
                <span>© 2026 Knowledge Artisans · SmartHireAI</span>
                <div className={styles.barRight}>
                    <span>🔒 Security</span>
                    <span>🛡️ Privacy-first</span>
                </div>
            </div>
        </footer>
    )
}
