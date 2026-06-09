import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_FILE = path.join(__dirname, 'db.json')

const app = express()
app.use(cors())
app.use(express.json())

const readDB = () => {
    if (!fs.existsSync(DB_FILE)) return { users: [] }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
}

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, password, role, company } = req.body
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    const db = readDB()
    
    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' })
    }

    const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        password,
        role,
        company
    }

    db.users.push(newUser)
    writeDB(db)

    const { password: _, ...safeUser } = newUser
    res.json({ message: 'User created successfully', user: safeUser })
})

app.post('/api/signin', (req, res) => {
    const { email, password } = req.body
    
    const db = readDB()
    const user = db.users.find(u => u.email === email && u.password === password)
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' })
    }

    const { password: _, ...safeUser } = user
    res.json({ token: `mock-token-${user.id}`, user: safeUser })
})

app.post('/api/oauth', (req, res) => {
    const { provider, email, firstName, lastName } = req.body
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' })
    }

    const db = readDB()
    let user = db.users.find(u => u.email === email)
    
    // Create an account if one does not exist
    if (!user) {
        user = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            provider,
            role: 'Job Seeker',
            password: 'oauth-password-placeholder'
        }
        db.users.push(user)
        writeDB(db)
    }

    const { password: _, ...safeUser } = user
    res.json({ token: `mock-oauth-${user.id}`, user: safeUser })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`JSON Database backend running on http://localhost:${PORT}`)
})
