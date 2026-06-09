import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DotPattern from '../components/DotPattern'
import styles from './LegalPage.module.css'

export default function TermsOfService() {
    useEffect(() => window.scrollTo(0, 0), [])

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.heroWrap}>
                <DotPattern />
                <div className={styles.card}>
                    <h1 className={styles.title}>Terms of <span className={styles.accent}>Service</span></h1>
                    <p className={styles.desc}>
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>

                    <div className={styles.textBlock}>
                        <h2 className={styles.sectionTitle}><span>✅</span> 1. Acceptance of Terms</h2>
                        <p className={styles.text}>
                            By accessing or using our intelligent hiring platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                        </p>
                    </div>

                    <div className={styles.textBlock}>
                        <h2 className={styles.sectionTitle}><span>👤</span> 2. User Accounts</h2>
                        <p className={styles.text}>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </div>

                    <div className={styles.textBlock}>
                        <h2 className={styles.sectionTitle}><span>⚖️</span> 3. Intellectual Property</h2>
                        <p className={styles.text}>
                            The Service and its original content, features and functionality are and will remain the exclusive property of SmartHireAI and its licensors. Our AI engines, generated insights, and models are protected under applicable laws.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
