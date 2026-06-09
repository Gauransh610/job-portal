import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DotPattern from '../components/DotPattern'
import styles from './LegalPage.module.css'

export default function Contact() {
    useEffect(() => window.scrollTo(0, 0), [])

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.heroWrap}>
                <DotPattern />
                <div className={styles.card}>
                    <h1 className={styles.title}>Get in <span className={styles.accent}>Touch</span></h1>
                    <p className={styles.desc}>
                        Have a question about our features, pricing, or need technical support? 
                        Our team is here to help you get the most out of SmartHireAI.
                    </p>

                    <div className={styles.grid}>
                        <div className={styles.gridCard}>
                            <div className={styles.iconBox}>📧</div>
                            <h3 className={styles.gridTitle}>Email Us</h3>
                            <p className={styles.gridText}>support@smarthireai.com</p>
                            <p className={styles.gridText}>We reply within 24 hours.</p>
                        </div>
                        <div className={styles.gridCard}>
                            <div className={styles.iconBox}>📞</div>
                            <h3 className={styles.gridTitle}>Call Us</h3>
                            <p className={styles.gridText}>+1 (555) 123-4567</p>
                            <p className={styles.gridText}>Mon-Fri, 9am - 6pm PST</p>
                        </div>
                        <div className={styles.gridCard}>
                            <div className={styles.iconBox}>📍</div>
                            <h3 className={styles.gridTitle}>Visit Us</h3>
                            <p className={styles.gridText}>123 AI Boulevard, Suite 400</p>
                            <p className={styles.gridText}>San Francisco, CA 94107</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
