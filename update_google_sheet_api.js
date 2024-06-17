const { google } = require('googleapis');

const cors = require('cors')
app.use(cors())

const express = require('express')
const app = express()
const port = 1337

app.use(express.json())

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email:
      "googlesheetapi@clever-tap-5e29f.iam.gserviceaccount.com", //Placeholder client_email value
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCco6rDFVLQoH+b\nIZHISGDK3ErhGjHbNUtrydaJCLmisftktPfA6Cfen4Wdi7MHbzlDZP0hD2CzcLJH\nWONA67HfEN+P3SWGEE1uNtyxN5bY4ZFbXf1ydcB6U6uKsvOksd/BFLmyDl1tGWVd\n/qTnRt9N0MpV+ihsviv95EvPj6KSFdJTG9ZBnKOGof4sZa6T692im5+9AddmYvUX\nF0BfF2g9KCrLwwLSUQZLISjXRXnxya53IxAtJixTF3aqR9tenGjBddca9uXQ9RVX\n+KeEcKnY+3kgMdQeUDqi0Y/oyMvv7yK/ihSG4+ktiIQADks0cK7EcIgIv6BY/13r\n83BWLelJAgMBAAECggEAAMfrVpuVL/2n8qo4TjhsEQZ8QKz7fvIdM0uWnz1BRZXB\nPJH35zMdeDnW/TsOTzRN7GgyKGDpn5asSFKe17OBfC+YENWKIt02AuNZ1pLZHWXD\nf/OrxWlfoLX0jnndrJQzN/B5+pOP9mJXFgxkj99lBsW8CoLl6yyZgECsAH8JueXU\n439MGk0r0xqvTxEYulSiYH3X3aQA3zDHCf7UNBo52GwcZP7ww9bkZT+jXkc2HHtt\nxHdN/b/+M/t8chhoB3GOzf/55B2KYvjFw+nZZ4xZLU/rKe4eyY6WT/1qo/ovJb0i\nrFTKT1AKm9kyltH9I6QMCumkwteLXFFX8yLhmJAl8QKBgQDJKrMwrfQ6LYwaoZKj\nVagG8pYJukb6wo4kHQiJ40qrSbaJ56O1NAY0lM/JzXoLY/F1PYKN5pBGWo79TzHa\nZBfUrJhmBhqF4cFkZD85TlMDsGQdwa4DdYZ+f39415FhOIGVYrdtmnp+fO8fupr/\nLWF1wgh5P6Conh24oTDD9G/Y2QKBgQDHVd3MvJ8dkaH0TBpH41XmvWHtogjRwCAH\n1KINDUiQLNxRt+dT6pQI78fmYeKPfxiNEiVqwS4hUpFPJvBVe5XBJl8m6l+1Hxx2\no+nUZWiXOfVHtEyjrIch/rnq4fO3Kw6/D5ZvP/ieWoe5CR8+rX8aDpwPXeOlT+8R\nNVi6TAXN8QKBgQC3sSoXVYEibtz0pH2GcH0SewnOsC6IZIfvKiPV5ZsVdiYdH0w5\n9tuDwC9NkzfSltyxtg01DkjINYFEhcB8L9Ii/cfbwc8OWeuChJfG+GKNh9Cj62u+\n9N5vPHVmH1I9eJ+7jXz5tIoOXn7sdjV6tjG8mgWq0hMeZeO16FrjVJ2dYQKBgQC9\nN1L9v6bCqLU1cvAXgULPbsIAkqkQgfFlvX++J/fTc+IHaCycSbYP7ZyxogUv9ZNW\nhf0ioxGo6/mnSu0kF9YFrOjxxdTn1wprzBhwV3q64ndkg0+kpmb37BaLUcTJAIRU\n9PT10aGsn37qNDCGjKZ0E54sMBGhoIjsqtj4rqVr4QKBgQC0BVZTL6wnwk99QadQ\ncmCl3ICsCJKRoQn5QlML/0DfMVI2JqbRb7b4WBoVWEMUaKwWtY/2fY56UyckFMzN\nbsrq5Pbr4GRSdLyRyEwd6qeV0o8d3gxrGhIWZpxqel6Ji65CE6dRCTzy07OoUYNP\n5J2dyGI7qa3EjdhQXWH8tsHv1Q==\n-----END PRIVATE KEY-----\n", //Placeholder private_key value
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({ auth, version: "v4" }); // This is from your showing script.

const spreadsheetId = "1RA54GZKbs-ZILxXOojnSd-afygG-rov7N3O7E99Ys7k"; // Please set your Spreadsheet ID.
const sheetName = "vouncher"; // Please set your sheet name.

app.post('/updatesheet', async (req, res) => {
  res.json({ requestBody: "OK" })

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log(JSON.stringify(req.body))

  const inputValues = ["2", "used"]; // This is a sample input value.

  const { data: { values } } = await sheets.spreadsheets.values.get({ spreadsheetId, range: sheetName });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetName,
    resource: { values: values.map((r) => inputValues.includes(r[0]) ? [r[0], r[1], "used"] : r) },
    valueInputOption: "USER_ENTERED",
  });
})

app.get('/updatesheet', async (req, res) => {
  res.send("OK");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})