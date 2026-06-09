import styles from './CareerCard.module.css'

export default function CareerCard() {
    return (
        <div className={styles.card}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.dots}>
                    <span className={`${styles.dot} ${styles.red}`} />
                    <span className={`${styles.dot} ${styles.amber}`} />
                    <span className={`${styles.dot} ${styles.green}`} />
                </div>
                <span className={styles.title}>Career Intelligence Report (Preview)</span>
                <span className={styles.v}>v1</span>
            </div>

            {/* Score */}
            <div className={styles.scoreRow}>
                <div>
                    <div className={styles.scoreLabel}>Resume Score</div>
                    <div className={styles.scoreNum}>92</div>
                    <div className={styles.scoreSub}>Strong for senior roles</div>
                </div>
                <button className={styles.topRoles}>Top Role Matches</button>
            </div>

            {/* Principal Architect */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.roleName}>Principal Architect</span>
                    <span className={styles.matchPct}>88% match</span>
                </div>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '88%' }} />
                </div>
                <div className={styles.roleTags}>
                    {['Cloud-native', 'Platform', 'Leadership'].map(t => (
                        <span key={t} className={styles.roleTag}>{t}</span>
                    ))}
                </div>
            </div>

            {/* AI Interview */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.roleName}>AI Interview</span>
                    <span className={styles.badgeText}>Text-based</span>
                </div>
                <p className={styles.secBody}>
                    Your assessment is conducted via an AI text interview that adapts to your answers.
                </p>
            </div>

            {/* Deeper insights */}
            <div className={styles.deeperRow}>
                <span className={styles.deeperLabel}>Unlock deeper insights</span>
            </div>
            <div className={styles.insightsGrid}>
                <div className={styles.chip}>Skill gaps</div>
                <div className={styles.chip}>Salary</div>
                <div className={styles.chip}>Market</div>
                <button className={styles.btnReport}>Get report</button>
            </div>
        </div>
    )
}
