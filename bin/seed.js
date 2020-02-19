require('dotenv').config()
const mongoose = require("mongoose");
const faker = require("faker");
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const User = require('../models/User')
const Travel = require('../models/Travel')
const City = require('../models/City')
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

function dbConnect(cb) {
    mongoose
        .connect(`${process.env.DBURL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
            cb();
        })
        .catch(err => {
            console.error("Error connecting to mongo", err);
        });
}

dbConnect(() => {
    let counter = 0;

    const idCity = Array(6)
        .fill()
        .map(() => {
            return new mongoose.mongo.ObjectId()
        })

    const idUser = Array(2)
        .fill()
        .map(() => {
            return new mongoose.mongo.ObjectId()
        })

    let users = [{
            _id: idUser[0],
            username: "Arturo",
            password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
            email: 'arturo@gmail.com',
            cityOrigin: faker.address.city(),
            role: 'admin'

        },
        {
            _id: idUser[1],
            username: "Jose",
            password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
            email: 'jose@gmail.com',
            cityOrigin: faker.address.city()
        }
    ]

    let imgCityArr = ['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=3465&q=80',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1495542779398-9fec7dc7986c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1936&q=80',
        'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&auto=format&fit=crop&w=2532&q=80',
        'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
    ]
    
    const fakeCity = Array(6)
        .fill()
        .map(() => {
            return {
                _id: idCity[counter++],
                name: faker.address.city(),
                country: faker.address.country(),
                socket: faker.lorem.word(),
                currency: faker.finance.currencySymbol(),
                language: faker.lorem.word(),
                position: {
                    lat: faker.address.latitude(),
                    lon: faker.address.longitude()
                },
                img: imgCityArr[randomInt(0, imgCityArr.length - 1)],
                description: faker.lorem.paragraphs(),
                total: 0
            }
        })

    User.deleteMany()
        .then(() => {
            return User.create(users)
        })
        .then(() => {
            console.log('succesfully added the User to te data')
        })
    City.deleteMany()
        .then(() => {
            return City.create(fakeCity)
        })
        .then(() => {
            console.log('succesfully added the city to te data')
        })

    const dolar = ['💵', '💵💵', '💵💵💵']
    const tags = ['cultural', 'relax', 'party']
    const days = [2, 5, 7]
    const duration = ['30min-1hour', '1-2 hours', '2-3 hours', '3 or more hours']


    function fakeDays(counter) {
        let counterDays = 0
        return Array(counter)
            .fill()
            .map(() => {
                counterDays++
                return {
                    index: counterDays,
                    breakfast: {
                        place: faker.commerce.product(),
                        address: faker.address.streetName(),
                        position: {
                            lat: faker.address.latitude(),
                            lon: faker.address.longitude()
                        },
                        description: faker.lorem.sentence(),
                    },
                    morning: [{
                        place: faker.commerce.product(),
                        address: faker.address.streetName(),
                        duration: duration[randomInt(0, duration.length - 1)],
                        position: {
                            lat: faker.address.latitude(),
                            lon: faker.address.longitude()
                        },
                        description: faker.lorem.sentence()
                    }],
                    lunch: {
                        place: faker.commerce.product(),
                        address: faker.address.streetName(),
                        position: {
                            lat: faker.address.latitude(),
                            lon: faker.address.longitude()
                        },
                        description: faker.lorem.sentence(),
                    },
                    afternoon: [{
                        place: faker.commerce.product(),
                        address: faker.address.streetName(),
                        duration: duration[randomInt(0, duration.length - 1)],
                        position: {
                            lat: faker.address.latitude(),
                            lon: faker.address.longitude()
                        },
                        description: faker.lorem.sentence()
                    }],
                    dinner: {
                        place: faker.commerce.product(),
                        address: faker.address.streetName(),
                        position: {
                            lat: faker.address.latitude(),
                            lon: faker.address.longitude()
                        },
                        description: faker.lorem.sentence(),
                    }
                }


            })

    }

    function fakeTags() {
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        shuffle(tags);
        let start = randomInt(0, tags.length - 1);
        let modifiedArray = tags.slice(start)
        console.log(modifiedArray)

        return modifiedArray
    }


    const fakeTravel = Array(100)
        .fill()
        .map(() => {
            daysCounter = days[randomInt(0, days.length - 1)]

            return {
                tags: fakeTags(),
                budget: dolar[randomInt(0, dolar.length - 1)],
                name: faker.lorem.words(),
                city: idCity[randomInt(0, idCity.length - 1)],
                user: idUser[randomInt(0, idUser.length - 1)],
                numberOfDays: daysCounter,
                days: fakeDays(daysCounter),
                description: faker.lorem.paragraph()
            }
        })

    Travel.deleteMany()
        .then(() => {

            return Travel.create(fakeTravel)
        })
        .then(() => {

            console.log('succesfully added the travel to te data')
            mongoose.connection.close()
            process.exit(0)
        })
})