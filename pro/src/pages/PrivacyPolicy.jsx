import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DotPattern from '../components/DotPattern'
import styles from './LegalPage.module.css'

export default function PrivacyPolicy() {
    useEffect(() => window.scrollTo(0, 0), [])

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.heroWrap}>
                <DotPattern />
                <div className={styles.card}>
                    <h1 className={styles.title}>Privacy <span className={styles.accent}>Policy</span></h1>
                    <p className={styles.desc}>
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>

                    <div className={styles.textBlock}>
                        <h2 className={styles.sectionTitle}><span>🛡️</span> 1. Information We Collect</h2>
                        <p className={styles.text}>
                            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
                        </p>
                    </div>

                    <div className={styles.textBlock}>
                        <h2 className={styles.sectionTitle}><span>📊</span> 2. Use of Information</h2>
                        <p className={styles.text}>
                            We use the information we collect to operate and improve our intelligent platform, to communicate with you, and to personalize your experience. We do not share your personal information with third-parties, except where required by law.
                        </p>
                    </div>

                    <div className={styles.textBlock}>
                        <h2 className={styles.sectionTitle}><span>🔒</span> 3. Data Security</h2>
                        <p className={styles.text}>
                            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. We employ top-tier encrypted data storage to ensure your career data remains strictly confidential and secure.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
