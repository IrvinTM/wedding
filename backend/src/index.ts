import "jsr:@std/dotenv/load";
import express from 'npm:express'
import cors from 'npm:cors'
import { writeData } from './google_sheets/googleSheets.ts'

const PORT = Deno.env.PORT || 3000

type formObject = {
    nombres: string,
    telefono: number,
    confirmacion: boolean
    mensaje: string
}

const app = express()
//TODO: Add cors to allow a single origin
app.use(cors())

app.use(express.json())


app.post('/api/save', (req, res) => {
    const data: formObject = req.body
    writeData([[data.nombres, data.telefono, data.confirmacion, data.mensaje]]).then(() => {
        res.status(201).json({ message: 'Data saved' })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})