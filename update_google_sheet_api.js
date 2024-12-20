const { google } = require('googleapis');

const express = require('express')
const app = express()
const port = 1337

const path = require('path')

var cors = require('cors');
const { platform } = require('os');

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

const auth2 = new google.auth.GoogleAuth({
  credentials: {
    client_email:
      "firebase-adminsdk-ez6w3@akastore-project.iam.gserviceaccount.com", //Placeholder client_email value
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDg/YzPHUqsF0my\nj3/BXU0ES+MipUX6T1dupKBCkNxp3NNHmVUFadJnj7ar9ihw5BXcpqzlntC7xwhx\nfQD+aElDhbOdTTqojMBuvr8iZUeOE4VaKiWxwFbG95OuLoBmZUPBAonW3fXFKyL7\nOXEmlxMQbzx9oCDoTq1VNaArUXgmximZTukAE7T2zKSiK6hwv8oJEkVmXNrvNTKb\nU0j4kcrges2VMIZXmtbp5lCL0z+yWfPAYGRaT35MNt0aRQGWx8BFZ3dDMeVXTTXC\n1QMcdYdZBBMIn5vNf4ElUA3nH+N59ZhxAkGjKtr8uBIAPQe+X6XPcrx+1HMVjN/c\nN/fRAkiPAgMBAAECggEAa6VkRYQCQiwyOpily2JUgwW7+suQm55yeqGRe8fLbWsW\nO1+Faj2jSaFdCRGRb9HxE807U/GUdQNZatMgMpi61O+XbF+S/Sm6uEHTOSW0Aqoc\nV3Nq7YzU+AVkRyZAkL1KmYIZaRBxkpB9AC4PkSMfH/HYw1Jl7EAYdnhd1dv43LN1\nBYVTbMmPolfk9kQ6gLotfK7BGN0eQfW9QoHLHlatBri5MgFKXxotFTnCDZBSRM8J\nggo+xP+O6bYerMYOTtGn7FnLKpdzyAogmUdxHTbSRq+TWXAjCSis8Hw72bzbRAgO\ndrQvmVYxEb7ZYzDlY/7Q6gm8ivvxKuTymV4YhA4+QQKBgQD/M45K2FjdVtpkkxcn\n7b/wdJI8qbh3GFQ8ZIlqXYm750esh67Vsi3y2riXWVZq61zzoEA+2Xl1LfQUXfyQ\nw/PuzVjJaB7rUf+PFhbQWUb0TF8HmkZOCunPw5eZj2ZtNowOLWBP7cLBBWr1x1Wy\nG/1gxaLm49FlUG+QXTRCwG6cKQKBgQDhscq72yP+v7nCRz2k0ZmMpiIQk+aHLpiZ\nh+JZZUuyYPhYxsAxYLXHwBee0NK4lbsDlA+MzeNcSSn+f5E1YVgGY9QYk5Dqi5te\nvFpQHaz2SEtZ7kV6GRiZPRHNSOzKeqQjsq2d3XZiuhHP0gPGMk11qHBjj4M7by0S\nYCXRlvBV9wKBgCBo6MJClY6OkC/DqmYswHqGI2hG2aFuWoxM7FKwzGQrrCOSG7cR\n6Nn1wwmdk+cCOwzJpj8VGWKzUlMf2Ip+CEWkmIkDiyGxiTYfxQfyvpsZ89ugURtq\nMWVsXp1m48gs7D6Err2X4WroCDxsc0qqWVRn5RdTiW1HeNOpspBjpeh5AoGBANAO\nNSUuJCWQmu7E+8e3zQRCln6PyWDvDI/kGz5ryfdbuzUjq0MZsxm8NEocmVS9+xOW\nZytXFXQaolLRSIxb+2iQmJI7XslI/2a63cqjQLIc/RGfPH8NKYcCLCoBQwB5RF0A\nN1qjMKJcg1UAdqg78Po417qALusYVwVsixCGQ3ILAoGAfymOuicpJcV8Z9EckEYt\nvtvxVyIqyfoEr8XMUdmNA6VPVW8YNZXU41tkNgPf5PgH0G/TMFA4WwV7WP9DPjNn\nrT9VIvyhODtg0YI6UBu4eBEBxLtE0Se4652JNtyOX6NguJTjmZDik2w7AqhSzRi/\nKdebZl8yD/B+eRzwdpkYBjg=\n-----END PRIVATE KEY-----\n", //Placeholder private_key value
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets2 = google.sheets({ auth2, version: "v4" }); // This is from your showing script.

const spreadsheetIdAppsflyer = "1rD8uXA_jUSfW9QGadbbp0DUfcRyaT6yESo3q-RKd7yo"; // Please set your Spreadsheet ID.
const appsflyer_feed = "appsflyer_feed";

//Appsflyer mParticle webhook
var appsflyer_data = []

app.post('/webhook_v3', (req, res) => {
  appsflyer_data.push(req.body)
  res.send("OK")
})

async function sendToSheetAppsFlyer() {
  console.log(appsflyer_data)
  if (appsflyer_data.length) {
    let data = appsflyer_data.pop();

    for (let i = 0; i < data.length; i++) {
      var device_id = ""
      var platform = ""
      var device_model = ""
      var mpid = ""
      var customer_id = ""
      var other = ""
      var mobile_number = ""
      var event_name = ""
      var event_time = null	
      var event_value = {}
      var created_date = null
      var source = "AKA"

      device_id = data[i].device_info.android_advertising_id
      platform = data[i].device_info.platform
      device_model = data[i].device_info.device_model
      mpid = data[i].mpid
      customer_id = data[i].user_identities.customer_id
      other = data[i].user_identities.other
      mobile_number = data[i].user_identities.mobile_number
      event_name = data[i].event[0].data.custom_attributes.event_name
      event_time = data[i].event[0].data.custom_attributes.event_time
      event_value = data[i].event[0].data.custom_attributes.event_value

      const input = created_date;
      const regex = /\$(?:D_)?(\d+)/;
      const match = input.match(regex);

      const date = new Date(match[1] * 1000);
      const pad = (num) => num.toString().padStart(2, '0');
      const options = { timeZone: 'Asia/Bangkok', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const gmtPlus7Date = new Intl.DateTimeFormat('en-GB', options).format(date);
      const sheet_created_date = gmtPlus7Date.replace(', ', ' ');

      console.log(device_id)
      console.log(platform)
      console.log(device_model)
      console.log(mpid)
      console.log(customer_id)
      console.log(other)
      console.log(mobile_number)
      console.log(event_name)
      console.log(event_time)
      console.log(event_value)
      console.log(sheet_created_date)
      console.log(source)

      await sheets2.spreadsheets.values.append({
        spreadsheetIdAppsflyer,
        range: appsflyer_feed,
        valueInputOption: "USER_ENTERED",
        requestBody: { majorDimension: "ROWS", values: [[device_id, platform, device_model, mpid, customer_id, other, mobile_number, event_name, event_time, event_value, sheet_created_date, source]] },
      });
    }
  }

  setTimeout(sendToSheetAppsFlyer, 1000);
}

sendToSheetAppsFlyer()
//Appsflyer mParticle webhook

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

//VIB CLEVERTAP WEBHOOK
app.post('/webhook', async (req, res) => {
  eventData.push(req.body.profiles)
  res.send("OK")
})

async function sendToSheet() {
  if (eventData.length) {
    let data = eventData.pop();

    console.log(data)

    for (let i = 0; i < data.length; i++) {
      if (data[i].key_values.event === "minigame_played") {
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
        var user_platform = ""

        if (data[i].event_properties.prize_title == "Sổ tiết kiệm 50 triệu") {
          user_identified = data[i].identity
          email_address = data[i].email
          mobile_number = data[i].phone
          prize_title = data[i].event_properties.prize_title
          amount = data[i].event_properties.amount
          type = data[i].event_properties.type
          term = data[i].event_properties.term
          delivered_date = data[i].event_properties.delivered_date
          created_date = data[i].event_properties.created_date
          user_platform = data[i].event_properties.platform
          source = data[i].key_values.source

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
            requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, prize_title, amount, type, term, sheet_delivered_date, "", null, "", "", sheet_created_date, source, user_platform]] },
          });
        }

        else if (data[i].event_properties.prize_title == "Tai nghe JBL Tune 501BT") {
          user_identified = data[i].identity
          email_address = data[i].email
          mobile_number = data[i].phone
          prize_title = data[i].event_properties.prize_title
          created_date = data[i].event_properties.created_date
          user_platform = data[i].event_properties.platform
          source = data[i].key_values.source

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
            requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, prize_title, null, "", "", null, "", null, "", "", sheet_created_date, source, user_platform]] },
          });
        }

        else {
          user_identified = data[i].identity
          email_address = data[i].email
          mobile_number = data[i].phone
          prize_title = data[i].event_properties.prize_title
          code = data[i].event_properties.code
          validate = data[i].event_properties.validate
          offer = "'"+data[i].event_properties.offer
          service = data[i].event_properties.service
          created_date = data[i].event_properties.created_date
          user_platform = data[i].event_properties.platform
          source = data[i].key_values.source

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
            requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, prize_title, null, "", "", null, code, sheet_validate, offer, service, sheet_created_date, source, user_platform]] },
          });
        }
      } else if (data[i].key_values.event === "survey_submitted") {
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

        user_identified = data[i].identity
        email_address = data[i].email
        mobile_number = data[i].phone
        q1 = data[i].event_properties.Q1
        q2 = data[i].event_properties.Q2
        q3 = data[i].event_properties.Q3
        q4 = data[i].event_properties.Q4
        q5 = data[i].event_properties.Q5
        created_date = data[i].event_properties.created_date
        user_platform = data[i].event_properties.platform
        source = data[i].key_values.source

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
          requestBody: { majorDimension: "ROWS", values: [[user_identified, email_address, mobile_number, q1, q2, q3, q4, q5, sheet_created_date, source, user_platform]] },
        });
      }
    }
  }

  setTimeout(sendToSheet, 1000);
}

sendToSheet()
//VIB CLEVERTAP WEBHOOK

app.get('/updatesheet', async (req, res) => {
  res.send("OK");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})