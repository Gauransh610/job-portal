import styles from './HowItWorks.module.css'

const STEPS = [
    {
        num: 'Step 1',
        icon: '📄',
        title: 'Upload your resume',
        desc: 'We extract skills, experience, and role signals. You stay in control of your data.',
    },
    {
        num: 'Step 2',
        icon: '📊',
        title: 'Get your report',
        desc: 'Instant baseline insights: resume score, role matches, and improvement opportunities.',
    },
    {
        num: 'Step 3',
        icon: '⚙️',
        title: 'Unlock deeper tools',
        desc: 'Run assessments + AI text interviews, salary insights, market analysis, and more.',
    },
]

export default function HowItWorks() {
    return (
        <section className={styles.section} id="how">
            <div className={styles.inner}>
                {/* Top label */}
                <p className={styles.label}>HOW IT WORKS</p>

                <div className={styles.headRow}>
                    <h2 className={styles.h2}>3 steps. <span className={styles.bold}>Real clarity.</span></h2>
                    <div className={styles.secure}>
                        <span>🔒</span> Secure processing
                    </div>
                </div>

                <p className={styles.sub}>
                    Designed to get you value fast — then go deeper when you choose.
                </p>

                {/* Step cards */}
                <div className={styles.cards}>
                    {STEPS.map((s, i) => (
                        <div key={s.num} className={`${styles.card} ${i === 0 ? styles.cardActive : ''}`}>
                            <div className={styles.cardTop}>
                                <span className={styles.stepBadge}>{s.num}</span>
                                <span className={styles.stepIcon}>{s.icon}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{s.title}</h3>
                            <p className={styles.cardDesc}>{s.desc}</p>
                            {i < STEPS.length - 1 && <div className={styles.connector} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
