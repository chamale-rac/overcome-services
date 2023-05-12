import express from 'express'
import { OpenAI } from '../models/OpenAI.js'
import * as dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.route('/').get((req, res) => {
	res.status(200).json({ message: 'Hola desde la API mas cool, chatGpt' })
})

router.route('/').post(async (req, res) => {
	try {
		const openAI = new OpenAI(process.env.OPENAI_API_KEY)
		const model = 'text-davinci-003'

		const generatePrompt = (title, date, duration, hour, tags) => {
			console.log(title, date, duration, hour, tags)
			return `Escribe una invitacion breve para un evento de videojuegos llamado ${title}, que será el ${date} durara ${duration} minutos y comenzara a las ${hour}. Los tags del evento son ${tags}.`
		}

		const { title, date, duration, hour, tags } = req.body

		await openAI
			.generateText(
				generatePrompt(title, date, duration, hour, tags),
				model,
				80,
			)
			.then((text) => {
				res.status(200).json({ description: text })
				console.log(text)
			})
			.catch((error) => {
				console.log(error)
				res.status(401).json({ message: `API error: ${error}` })
			})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Algo salió mal' })
	}
})

export default router
