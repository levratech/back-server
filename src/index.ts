import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'

const app = express()
const logFilePath = path.join(__dirname, '..', 'log.txt')
if (!fs.existsSync(logFilePath)) {
	fs.writeFileSync(logFilePath, '', 'utf8')
}
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())

app.use(
	cors({
		origin: 'https://class.levratech.com',
		methods: ['GET', 'POST', 'OPTIONS'],
		allowedHeaders: ['Content-Type'],
	})
)

app.get('/', (req, res) => {
	res.send('HOWDY')
})

app.post('/log', (req, res) => {
	const entry = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`
	fs.appendFile(logFilePath, entry, (err) => {
		if (err) {
			console.error('Failed to write to log:', err)
			return res.status(500).send('Failed to log')
		}
		res.json({ status: 'ok' })
	})
})

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
