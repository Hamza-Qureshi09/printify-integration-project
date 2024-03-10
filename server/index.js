import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || "sandbox";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url =
  environment === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

// Your route handling code

// Helper / Utility functions

//Servers the index.html file
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

//Servers the style.css file
app.get("/style.css", (req, res) => {
  res.sendFile(process.cwd() + "/style.css");
});

//Servers the script.js file
app.get("/script.js", (req, res) => {
  res.sendFile(process.cwd() + "/script.js");
});

//PayPal Developer YouTube Video:
//How to Retrieve an API Access Token (Node.js)
//https://www.youtube.com/watch?v=HOkkbGSxmp4
function get_access_token() {
  const auth = `${client_id}:${client_secret}`;
  const data = "grant_type=client_credentials";
  return fetch(endpoint_url + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((json) => {
      return json.access_token;
    });
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
