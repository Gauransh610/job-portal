import styles from './WhatYouGet.module.css'

const FEATURES = [
    {
        icon: '📋',
        title: 'Resume-based career intelligence',
        desc: 'Your report is personalized from your resume — not generic templates or random tips.',
    },
    {
        icon: '💬',
        title: 'Assessments + AI text interviews',
        desc: 'Assessments are conducted through an adaptive AI interview for realistic evaluation.',
    },
    {
        icon: '🛡️',
        title: 'Recruiter-ready outputs',
        desc: 'Clear summaries you can use to optimize your profile and prepare for interviews.',
    },
]

export default function WhatYouGet() {
    return (
        <section className={styles.section} id="what">
            <div className={styles.inner}>
                {/* Top label */}
                <p className={styles.label}>WHAT YOU GET</p>

                <div className={styles.headRow}>
                    <h2 className={styles.h2}>
                        A superior experience —{' '}
                        <span className={styles.accent}>designed for real hiring.</span>
                    </h2>
                    <div className={styles.tip}>
                        <span className={styles.tipDot}>💡</span>
                        Tip: Start free → unlock only what you need.
                    </div>
                </div>

                <p className={styles.sub}>
                    You don't need more job listings. You need clarity. SmartHireAI gives you
                    actionable insights recruiters care about.
                </p>

                {/* Cards */}
                <div className={styles.cards}>
                    {FEATURES.map(f => (
                        <div key={f.title} className={styles.card}>
                            <div className={styles.cardIcon}>{f.icon}</div>
                            <h3 className={styles.cardTitle}>{f.title}</h3>
                            <p className={styles.cardDesc}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
