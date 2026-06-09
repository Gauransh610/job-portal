import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CTABanner.module.css'

export default function CTABanner() {
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // Open the OS file picker — stops any event bubbling / navigation
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
        <section className={styles.section}>
            <div className={styles.card}>

                {/* ── Left text ── */}
                <div className={styles.left}>
                    <span className={styles.badge}>Start in minutes</span>
                    <h2 className={styles.h2}>Ready to stop guessing?</h2>
                    <p className={styles.sub}>
                        Upload your resume. Get your Career Intelligence Report. Then unlock
                        assessments and AI interviews only when you need them.
                    </p>
                </div>

                {/* ── Upload area ── */}
                <div className={styles.actions}>

                    {/* Hidden native file input — PDF only */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf,.pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    {/* Primary button — type="button" prevents form submit */}
                    <button
                        type="button"
                        className={styles.btnUpload}
                        onClick={handleButtonClick}
                    >
                        ⬆&nbsp; Upload Resume &amp; Start
                    </button>

                    {/* Error message */}
                    {error && (
                        <p className={styles.errorMsg}>{error}</p>
                    )}

                    {/* File card shown after a valid PDF is chosen */}
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
                </div>
            </div>
        </section>
    )
}
