import fs from 'fs'
import path from 'path'
import express from 'express'

const app = express()
const logFilePath = path.join(__dirname, '..', 'log.txt')
if (!fs.existsSync(logFilePath)) {
	fs.writeFileSync(logFilePath, '', 'utf8')
}
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

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
		res.send('Logged')
	})
})

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
