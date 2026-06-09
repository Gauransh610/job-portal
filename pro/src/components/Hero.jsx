import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CareerCard from './CareerCard'
import styles from './Hero.module.css'

const TAGS = ['Resume-based insights', 'AI assessments + interviews', 'Recruiter-ready outputs']

export default function Hero() {
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleButtonClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const user = localStorage.getItem('user')
        if (!user) {
            navigate('/signup')
            return
        }

        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        if (!selected) return

        if (selected.type !== 'application/pdf') {
            setError('❌ Only PDF files are allowed.')
            setFile(null)
            e.target.value = ''
            return
        }

        setError('')
        setFile(selected)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        setFile(null)
        setError('')
        fileInputRef.current.value = ''
    }

    return (
        <section className={styles.hero}>
            {/* ── LEFT ── */}
            <div className={styles.left}>
                <div className={styles.badge}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Not a job board — Career intelligence.
                </div>

                <h1 className={styles.h1}>
                    <span className={styles.gradWord}>Discover</span> your real worth{' '}
                    <span className={styles.accentWord}>in today's</span>{' '}
                    job market — <span className={styles.amberWord}>before</span> you apply.
                </h1>

                <p className={styles.sub}>
                    JobsifyAI analyzes your resume to generate a personalized Career
                    Intelligence Report: role match, skill gaps that matter, interview
                    readiness, and real-time market insights.
                </p>

                {/* ── File Input (Hidden) ── */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                <div className={styles.btns}>
                    <button type="button" className={styles.btnPrimary} onClick={handleButtonClick}>
                        📄 Upload Resume &amp; start →
                    </button>
                    <a href="#what" className={styles.btnOutline}>
                        🗂 View a sample report
                    </a>
                </div>

                {/* ── Optional Upload Status Cards ── */}
                {error && (
                    <p className={styles.errorMsg}>{error}</p>
                )}

                {file && !error && (
                    <div className={styles.fileCard}>
                        <span className={styles.fileIcon}>📄</span>
                        <div className={styles.fileInfo}>
                            <span className={styles.fileName}>{file.name}</span>
                            <span className={styles.fileSize}>
                                {(file.size / 1024).toFixed(1)} KB · PDF
                            </span>
                        </div>
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={handleRemove}
                            title="Remove file"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className={styles.tags}>
                    {TAGS.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>

                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🔒</div>
                        <div>
                            <div className={styles.featureTitle}>Privacy-first</div>
                            <div className={styles.featureDesc}>
                                Your resume is processed to generate your report. You stay in control.
                            </div>
                        </div>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>⚡</div>
                        <div>
                            <div className={styles.featureTitle}>Fast activation</div>
                            <div className={styles.featureDesc}>
                                Get meaningful insights in minutes — then unlock deeper tools when needed.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RIGHT ── */}
            <CareerCard />
        </section>
    )
}
