import { google } from "npm:googleapis";
import "jsr:@std/dotenv/load";


const creds = Deno.env.get("CREDS")
const jon = JSON.parse(creds)

/* const auth2 = google.auth.fromJSON(creds) */
const auth2 = new google.auth.GoogleAuth({
    credentials: jon,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
})

export async function writeData(values: any[][]) {

    const sheets = google.sheets({ version: "v4", auth: auth2 });
    const spreadsheetId = "1lcrnKkkwST5m40A18bhBLkgtFPo1Ldg_KC0u0M7Xnbg"
    const range = "sheet1!A:D"
    const valueInputOption = "USER_ENTERED"

    const resource = {
        values,
    }

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            requestBody: resource,
        })

        console.log(response)
        return response
    } catch (err) {
        console.error(err)
    }
}

export async function readData() {
    const sheets = google.sheets({ version: "v4", auth: auth2 });
    const spreadsheetId = "1lcrnKkkwST5m40A18bhBLkgtFPo1Ldg_KC0u0M7Xnbg"
    const range = "sheet1"
    const data = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    })
    return data
}

