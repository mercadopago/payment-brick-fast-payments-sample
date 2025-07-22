import hbs from 'hbs';
import open from 'open';
import path from 'path';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MercadoPagoConfig, Order } from "mercadopago";

const mercadoPagoPublicKey = process.env.MERCADO_PAGO_SAMPLE_PUBLIC_KEY;
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  process.exit(1);
}

const mercadoPagoAccessToken = process.env.MERCADO_PAGO_SAMPLE_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  process.exit(1);
}

const payerEmail = process.env.PAYER_EMAIL;
if (!payerEmail) {
  console.log("Error: payer email not defined");
  process.exit(1);
}

const mpClient = new MercadoPagoConfig({
	accessToken: mercadoPagoAccessToken,
});

const app = express();

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.set("views", path.join(import.meta.dirname, "views"))

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./static"));
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).render("index", { mercadoPagoPublicKey, payerEmail });
}); 

app.post("/process_payment", async (req, res) => {
  const order = new Order(mpClient);
  const { formData, userEmail } = req.body;

  const body = {
    type: "online",
    processing_mode: "automatic",
    total_amount: formData[0].amount,
    external_reference: "ext_ref_1234",
    payer: {
      email: userEmail,
    },
    transactions: {
      payments: formData,
    },
  };

  const requestOptions = {
    idempotencyKey: uuidv4(),
  };

  try {
    const response = await order.create({ body, requestOptions });
    res.status(201).json({
      detail: response.status_detail,
      status: response.status,
      id: response.id
    });

  } catch (error) {
    console.error("Fail to process payment", JSON.stringify(error, null, 4));

    const errorMessage = "An error occurred while processing the payment. Check server logs for more details.";
    res.status(500).json({ error_message: errorMessage });
  }
});

app.listen(8080, () => {
  console.log("The server is now running on port 8080");
  open("http://localhost:8080");
});
