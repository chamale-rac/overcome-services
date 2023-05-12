import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import dalleRoutes from './routes/dalleRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limig: '50mb' }))

app.use('/dalle', dalleRoutes)

app.use('/chat', chatRoutes)

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hola desde la API mas cool' })
})

app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'))
