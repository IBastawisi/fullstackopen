const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.kjmow.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length == 3) {
    console.log('phonebook:');
    Contact.find({}).then(result => {
        result.forEach(c => {
            console.log(`${c.name}: ${c.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length == 5) {
    const contact = new Contact({
        name,
        number,
    })

    contact.save().then(result => {
        console.log(`Added ${name}: ${number} to phonebook`)
        mongoose.connection.close()
    })
}
