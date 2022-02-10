require("dotenv").config();
const MongoDB = require("mongodb"),
    MongoClient = MongoDB.MongoClient,
    mongoURL = process.env.MONGOURL
    dbName = "wondemagen_barbershop",
    sliderCollection = "slider_images",
    staffCollection = "staff",
    productsCollection = "products",
    messagesCollection = "user_messages",
    galleryCollection = "gallery",
    ratingCollection = "user_rating";

function sendForm(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        let newCustomerMessage = req.body;
        dbo
            .collection(messagesCollection)
            .insertOne(newCustomerMessage, function (err, client) {
                console.log(client);
                if (err) throw err;
                res.sendStatus(201);
                db.close();
            });
    });
}

function getMessages(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(messagesCollection).find({}).toArray(function (err, allMessages) {
            if (err) throw err;
            res.send(allMessages)
            console.log(allMessages);
        });
    });
}

function sendReviewForm(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        let newCustomerReview = req.body;
        dbo
            .collection(ratingCollection)
            .insertOne(newCustomerReview, function (err, client) {
                console.log(client);
                if (err) throw err;
                res.sendStatus(201);
                db.close();
            });
    });
}

function getReviews(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(ratingCollection).find({}).toArray(function (err, allReviews) {
            if (err) throw err;
            res.send(allReviews)
            console.log(allReviews);
            db.close();
        });
    });
}

function getSliderImages(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(sliderCollection).find({}).toArray(function (err, allSliderImages) {
            if (err) throw err;
            console.log(allSliderImages);
            res.send(allSliderImages)
            db.close();
        });
    });
}

function getStaffImages(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(staffCollection).find({}).toArray(function (err, allStaffImages) {
            if (err) throw err;
            console.log(allStaffImages);
            res.send(allStaffImages)
            db.close();
        });
    });
}

function getProducts(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(productsCollection).find({}).toArray(function (err, allProducts) {
            if (err) throw err;
            console.log(allProducts);
            res.send(allProducts)
            db.close();
        });
    });
}

function getGalleryImgs(req, res) {
    MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(galleryCollection).find({}).toArray(function (err, GalleryImgs) {
            if (err) throw err;
            console.log(GalleryImgs);
            res.send(GalleryImgs)
            db.close();
        });
    });
}


module.exports = {
    sendForm,
    getMessages,
    sendReviewForm,
    getReviews,
    getSliderImages,
    getStaffImages,
    getProducts,
    getGalleryImgs
};