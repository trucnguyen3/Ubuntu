const { google } = require('googleapis');

const express = require('express')
const app = express()
const port = 1337

const path = require('path')

var cors = require('cors')

app.use(express.json())

app.use(express.static(__dirname + '/public'));

app.use(cors())

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
const voucher = "voucher"; // Please set your sheet name.
const survey_submitted = "survey_submitted";
const minigame_played = "minigame_played";


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/login.html'));
});

app.post('/updatesheet', async (req, res) => {
  console.log((req.body))

  var sheetID = req.body.GSID

  const inputValues = [sheetID, "used"]; // This is a sample input value.

  const { data: { values } } = await sheets.spreadsheets.values.get({ spreadsheetId, range: voucher });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: voucher,
    resource: { values: values.map((r) => inputValues.includes(r[0]) ? [r[0], r[1], "used"] : r) },
    valueInputOption: "USER_ENTERED",
  });
})

var eventData = []

app.post('/webhook', async (req, res) => {
  //console.log(req.body.profiles)
  console.log(eventData + "1")
  eventData.push(req.body)
  /*
  for (let i = 0; i < req.body.profiles.length; i++) {
    //minigame
    if (req.body.key_values.event === "minigame_played") {
      var user_identified = ""
      var email_address = ""
      var mobile_number = ""
      var prize_title = ""
      var amount = null
      var type = ""
      var term = ""
      var delivered_date = null	
      var code = ""
      var validate = null
      var offer = ""
      var service = ""
      var created_date = null
      var source = ""

      if (req.body.profiles[i].event_properties.prize_title == "Sổ tiết kiệm 50 triệu") {
        user_identified = req.body.profiles[i].identity
        email_address = req.body.profiles[i].email
        mobile_number = req.body.profiles[i].phone
        prize_title = req.body.profiles[i].event_properties.prize_title
        amount = req.body.profiles[i].event_properties.amount
        type = req.body.profiles[i].event_properties.type
        term = req.body.profiles[i].event_properties.term
        delivered_date = req.body.profiles[i].event_properties.delivered_date
        created_date = req.body.profiles[i].event_properties.created_date
        source = req.body.key_values.source

        const input = created_date;
        const regex = /\$(?:D_)?(\d+)/;
        const match = input.match(regex);

        const date = new Date(match[1] * 1000);
        const pad = (num) => num.toString().padStart(2, '0');
        const options = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const gmtPlus7Date = new Intl.DateTimeFormat('en-GB', options).format(date);
        const sheet_created_date = gmtPlus7Date.replace(', ', ' ');

        const input2 = delivered_date;
        const regex2 = /\$(?:D_)?(\d+)/;
        const match2 = input2.match(regex2);

        const date2 = new Date(match2[1] * 1000);
        const pad2 = (num) => num.toString().padStart(2, '0');
        const options2 = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const gmtPlus7Date2 = new Intl.DateTimeFormat('en-GB', options2).format(date2);
        const sheet_delivered_date = gmtPlus7Date2.replace(', ', ' ');

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: minigame_played,
          valueInputOption: "USER_ENTERED",
          requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, prize_title, amount, type, term, sheet_delivered_date, "", null, "", "", sheet_created_date, source]] },
        });
      }

      else if (req.body.profiles[i].event_properties.prize_title == "Tai nghe JBL Tune 501BT") {
        user_identified = req.body.profiles[i].identity
        email_address = req.body.profiles[i].email
        mobile_number = req.body.profiles[i].phone
        prize_title = req.body.profiles[i].event_properties.prize_title
        created_date = req.body.profiles[i].event_properties.created_date
        source = req.body.key_values.source

        const input = created_date;
        const regex = /\$(?:D_)?(\d+)/;
        const match = input.match(regex);

        const date = new Date(match[1] * 1000);
        const pad = (num) => num.toString().padStart(2, '0');
        const options = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const gmtPlus7Date = new Intl.DateTimeFormat('en-GB', options).format(date);
        const sheet_created_date = gmtPlus7Date.replace(', ', ' ');

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: minigame_played,
          valueInputOption: "USER_ENTERED",
          requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, prize_title, null, "", "", null, "", null, "", "", sheet_created_date, source]] },
        });
      }

      else {
        user_identified = req.body.profiles[i].identity
        email_address = req.body.profiles[i].email
        mobile_number = req.body.profiles[i].phone
        prize_title = req.body.profiles[i].event_properties.prize_title
        code = req.body.profiles[i].event_properties.code
        validate = req.body.profiles[i].event_properties.validate
        offer = "'"+req.body.profiles[i].event_properties.offer
        service = req.body.profiles[i].event_properties.service
        created_date = req.body.profiles[i].event_properties.created_date
        source = req.body.key_values.source

        const input = created_date;
        const regex = /\$(?:D_)?(\d+)/;
        const match = input.match(regex);

        const date = new Date(match[1] * 1000);
        const pad = (num) => num.toString().padStart(2, '0');
        const options = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const gmtPlus7Date = new Intl.DateTimeFormat('en-GB', options).format(date);
        const sheet_created_date = gmtPlus7Date.replace(', ', ' ');

        const input2 = validate;
        const regex2 = /\$(?:D_)?(\d+)/;
        const match2 = input2.match(regex2);

        const date2 = new Date(match2[1] * 1000);
        const pad2 = (num) => num.toString().padStart(2, '0');
        const options2 = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const gmtPlus7Date2 = new Intl.DateTimeFormat('en-GB', options2).format(date2);
        const sheet_validate = gmtPlus7Date2.replace(', ', ' ');

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: minigame_played,
          valueInputOption: "USER_ENTERED",
          requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, prize_title, null, "", "", null, code, sheet_validate, offer, service, sheet_created_date, source]] },
        });
      }
    } else if (req.body.key_values.event === "survey_submitted") {
      //survey
      var user_identified = ""
      var email_address = ""
      var mobile_number = ""
      var q1 = ""
      var q2 = ""
      var q3 = ""
      var q4 = ""
      var q5 = ""
      var created_date = null
      var source = ""

      user_identified = req.body.profiles[i].identity
      email_address = req.body.profiles[i].email
      mobile_number = req.body.profiles[i].phone
      q1 = req.body.profiles[i].event_properties.Q1
      q2 = req.body.profiles[i].event_properties.Q2
      q3 = req.body.profiles[i].event_properties.Q3
      q4 = req.body.profiles[i].event_properties.Q4
      q5 = req.body.profiles[i].event_properties.Q5
      created_date = req.body.profiles[i].event_properties.created_date
      source = req.body.key_values.source

      const input = created_date;
      const regex = /\$(?:D_)?(\d+)/;
      const match = input.match(regex);

      const date = new Date(match[1] * 1000);
      const pad = (num) => num.toString().padStart(2, '0');
      const options = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const gmtPlus7Date = new Intl.DateTimeFormat('en-GB', options).format(date);
      const sheet_created_date = gmtPlus7Date.replace(', ', ' ');     

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: survey_submitted,
        valueInputOption: "USER_ENTERED",
        requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, q1, q2, q3, q4, q5, sheet_created_date, source]] },
      });
    }
  }
  */
  res.send("OK")
})

function sendToSheet() {
  console.log(eventData + "2")

  let data = eventData.pop()
  console.log(data + "3")
}

sendToSheet()

app.get('/updatesheet', async (req, res) => {
  res.send("OK");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})