console.log("app is loading");
const express = require("express");
const app = express();
const cors = require("cors");
const utils = require("./utils");
app.use(cors());

// used for json inside body 
app.use(express.json());


app.get("/user_messages", (req, res) => {
  utils.getMessages(req, res);
});

app.post("/user_messages", (req, res) => {
  utils.sendForm(req, res);
});

app.get("/user_rating", (req, res) => {
  utils.getReviews(req, res);
});

app.post("/user_rating", (req, res) => {
  utils.sendReviewForm(req, res);
});

app.get("/slider_images", (req, res) => {
  utils.getSliderImages(req, res);
});

app.get("/staff", (req, res) => {
  utils.getStaffImages(req, res);
});

app.get("/products", (req, res) =>{
  utils.getProducts(req, res);
});

app.get("/gallery", (req, res) =>{
  utils.getGalleryImgs(req, res);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
