const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mongoose = require('mongoose')
let connection

const Schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: false
	}
})

Schema.methods.isValidPassword = async function(password) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error) {
		throw new Error('Invalid password!')
	}
}

/**
 * 
 * @param {Object} loginOptions 
 * @param {string} loginOptions.MongoDB_URL
 * @param {string} loginOptions.username
 * @param {string} loginOptions.password
 * @param {Object} [loginOptions.mongooseConnectionOptions] - Additional mongoose settings {@link https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect }
 * @param {string} loginOptions.CollectionName
 */

module.exports.login = async (loginOptions) => {
	if (!loginOptions.password || !loginOptions.username || !loginOptions.MongoDB_URL || !loginOptions.CollectionName) {
		throw new Error('Argument(s) are not defined!')
	}
	if (!loginOptions.mongooseConnectionOptions) {
		loginOptions.mongooseConnectionOptions = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}
	}
	connection = await mongoose.connect(loginOptions.MongoDB_URL, loginOptions.mongooseConnectionOptions)
	let User = mongoose.model(loginOptions.CollectionName, Schema)
	await User.init()
	const currentUser = await User.findOne({
		username: loginOptions.username
	})

	const isCorrectPassword = await currentUser.isValidPassword(loginOptions.password)
	if (!isCorrectPassword) {
		throw new Error('Invalid password!')
	}

	if (!currentUser) {
		throw new Error(`${loginOptions.username} not found!`)
	}

	console.log('Passed!')
	return true
}

/**
 * 
 * @param {Object} loginOptions 
 * @param {string} loginOptions.MongoDB_URL
 * @param {string} loginOptions.username
 * @param {string} loginOptions.password
 * @param {Object} [loginOptions.mongooseConnectionOptions] - Additional mongoose settings {@link https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect }
 * @param {string} loginOptions.CollectionName
 */

module.exports.register = async (loginOptions) => {
	if (!loginOptions.password || !loginOptions.username || !loginOptions.MongoDB_URL || !loginOptions.CollectionName) {
		throw new Error('Argument(s) are not defined!')
	}
	if (!loginOptions.mongooseConnectionOptions) {
		loginOptions.mongooseConnectionOptions = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}
	}
	connection = await mongoose.connect(loginOptions.MongoDB_URL, loginOptions.mongooseConnectionOptions)
	console.log(loginOptions.CollectionName)
	let User = mongoose.model(loginOptions.CollectionName, Schema)
	await User.init()
	const currentUser = await User.findOne({
		username: loginOptions.username
	})

	if (currentUser) {
		throw new Error(`${loginOptions.username} is already taken!`)
	}

	let hashedPassword
	console.log(typeof loginOptions.password.toString())
	try {
		const salt = await bcrypt.genSalt(10)
		//console.log(salt, typeof salt)
		hashedPassword = await bcrypt.hash(loginOptions.password.toString(), salt)
	} catch (erro) {
		console.error(erro)
	}

	const newUser = new User({
		username: loginOptions.username,
		password: hashedPassword
	})
	newUser.save()
	return true
}
