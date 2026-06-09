import { useState } from 'react'
import styles from './FAQ.module.css'

const FAQ_ITEMS = [
    // Left column
    { id: 1, q: 'What is SmartHireAI?', a: 'SmartHireAI is an AI-powered career intelligence platform that analyzes your resume and generates a personalized report — including role match scores, skill gaps, interview readiness, and market insights.' },
    { id: 2, q: 'Can I use SmartHireAI as both a candidate and interviewer?', a: 'Yes! SmartHireAI supports both sides of the hiring process. Candidates get career insights, while interviewers can conduct structured AI-assisted evaluations.' },
    { id: 3, q: 'What types of assessments are available?', a: 'We offer AI text-based interviews, skill gap assessments, role-fit evaluations, and market readiness checks — all personalized to your resume.' },
    { id: 4, q: 'Why should I complete my profile?', a: 'A complete profile improves the accuracy of your career intelligence report and increases your visibility to recruiters using our platform.' },
    { id: 5, q: "Why don't I see assessments, results, or reports yet?", a: 'Make sure you have uploaded your resume and completed the initial setup. Reports are generated after your first assessment is complete.' },
    // Right column
    { id: 6, q: 'How do Smart Agents work?', a: 'Smart Agents are AI modules that proactively scan job market trends, match your profile to open roles, and surface actionable recommendations — all without manual searching.' },
    { id: 7, q: 'How accurate is the AI matching?', a: 'Our matching engine is trained on millions of job postings and resume patterns. It achieves high accuracy for senior and specialized roles, and continuously improves with new data.' },
    { id: 8, q: 'How does compliance verification work?', a: 'We validate credentials and work history signals from your resume, helping employers trust the accuracy of your profile before interviews.' },
    { id: 9, q: 'How do interviewers get paid?', a: 'Interviewers earn credits for completing structured evaluations on the platform. Credits can be redeemed for cash or used for premium SmartHireAI features.' },
    { id: 10, q: 'Can I edit AI-generated answers?', a: 'Yes. All AI-generated content — including interview summaries and role suggestions — can be reviewed, edited, and approved by you before sharing.' },
    { id: 11, q: 'How do employers register?', a: 'Employers can sign up via the "For Employers" section. After verifying your company, you get access to candidate reports, assessment tools, and smart matching.' },
]

// Split into two columns
const LEFT = FAQ_ITEMS.filter(f => f.id <= 5)
const RIGHT = FAQ_ITEMS.filter(f => f.id > 5)

function FAQItem({ item }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
            <button className={styles.question} onClick={() => setOpen(!open)} aria-expanded={open}>
                <span>{item.q}</span>
                <svg
                    className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && <p className={styles.answer}>{item.a}</p>}
        </div>
    )
}

export default function FAQ() {
    return (
        <section className={styles.section} id="faq">
            <div className={styles.inner}>
                <p className={styles.label}>FAQ</p>
                <h2 className={styles.h2}>Questions, <span className={styles.bold}>answered</span></h2>

                <div className={styles.grid}>
                    {/* Left column */}
                    <div className={styles.col}>
                        {LEFT.map(item => <FAQItem key={item.id} item={item} />)}
                    </div>
                    {/* Right column */}
                    <div className={styles.col}>
                        {RIGHT.map(item => <FAQItem key={item.id} item={item} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}
