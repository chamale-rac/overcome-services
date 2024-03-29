import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const router = express.Router()

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

router.route('/').get((req, res) => {
	res.status(200).json({ message: 'Hola desde la API mas cool, dalle' })
})

router.route('/').post(async (req, res) => {
	try {
		const { prompt } = req.body
		const { height, width } = req.body

		const response = await openai.createImage({
			prompt: prompt,
			n: 1,
			size: `${width}x${height}`,
			response_format: 'b64_json',
		})
		const image = response.data.data[0].b64_json
		res.status(200).json({ photo: image })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Algo salió mal' })
	}
})

export default router
