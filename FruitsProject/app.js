const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const Person = mongoose.model("Person", personSchema);

const carrot = new Fruit({
    name: "Carrot",
    rating: 7,
    review: "Carrot juice is tasty"
});

carrot.save();

const person = new Person({
    name: "John",
    age: 37
});

// person.save();

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
        mongoose.connection.close();
    }
});

// Fruit.updateOne(
//     { _id: "600d53f7dbd3f41260e990f6" },
//     { name: "Pineapple" },
//     function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Successfully updated the document");
//         }
//     }
// );

// Fruit.deleteOne({ name: "Pineapple" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted Successfully one document");
//     }
// });

// Person.deleteMany({ name: "John" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all documents");
//     }
// });

Person.updateOne({ name: "John" }, { favFruit: carrot }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfullt updated John");
    }
});
