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

		const generatePrompt = (topic) => {
			return `Escribe una invitación de un evento virtual con el siguiente tema "${topic}", usando un tono creativo, amigable e informativo. Escribelo todos en un solo parrafo sin usar saltos de linea '\n'.`
		}

		const { prompt } = req.body
		const title = 'Valorant Torneo'
		const date = '20/03/2003'
		const duration = '60'
		const hour = '20:00'

		await openAI
			.generateText(generatePrompt(prompt), model, 100)
			.then((text) => {
				res.status(200).json({ response: text })
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
