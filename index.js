const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());  //enable cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const successResponse = {
  "status": "success",
  "message": "Thank you. You are now subscribed."
}

const errorResponse = {
  "status": "error",
  "message": "Invalid Subscription request"
}

const PORT = process.env.PORT || 3000

app.post('/api/email-signup', (req, res) => {
  if(req.body.email){
    return res.status(200).send(successResponse);
  }
  return res.status(200).send(errorResponse);
});

app.listen(PORT, () =>
  console.log(`server is listening on port ${PORT}!`),
);