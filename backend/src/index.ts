import "jsr:@std/dotenv/load";
import express from 'npm:express'
import cors from 'npm:cors'
import { writeData } from './google_sheets/googleSheets.ts'

const PORT = Deno.env.get("PORT") || 3000

type formObject = {
    nombres: string,
    telefono: number,
    confirmacion: boolean
    mensaje: string
}

(async () => {
    const credentials = {
        type: Deno.env.get("TYPE"),
        project_id: Deno.env.get("PROJECT_ID"),
        private_key_id: Deno.env.get("PRIVATE_KEY_ID"),
        private_key: Deno.env.get("PRIVATE_KEY").replace(/\\n/g, '\n'), // Important: Handle newlines
        client_email: Deno.env.get("CLIENT_EMAIL"),
        client_id: Deno.env.get("CLIENT_ID"),
        auth_uri: Deno.env.get("AUTH_URI"),
        token_uri: Deno.env.get("TOKEN_URI"),
        auth_provider_x509_cert_url: Deno.env.get("AUTH_PROVIDER_X509_CERT_URL"),
        client_x509_cert_url: Deno.env.get("CLIENT_X509_CERT_URL"),
        universe_domain: Deno.env.get("UNIVERSE_DOMAIN"),
    }
    await Deno.writeTextFile("credentials1.json", JSON.stringify(credentials)).then(() => console.log("got credentials")).catch((e: any) => {
        console.log(e)
    })
})();


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