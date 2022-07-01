const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:1234@cluster0.0lord.mongodb.net/todo?retryWrites=true&w=majority", { // the DB is crm
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})
	.then(() => console.log("DB connected successfully"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));