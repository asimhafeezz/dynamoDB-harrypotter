const AWS = require("aws-sdk")

// dynamoDB client
const dynamoClient = new AWS.DynamoDB.DocumentClient()
// table name
const TABLE_NAME = "harry-potter"

// functions
// get all characters
const getCharacters = async () => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: "#name = :name",
		ExpressionAttributeNames: {
			"#name": "gender",
		},
		ExpressionAttributeValues: {
			":name": "male",
		},
	}
	const data = await dynamoClient.scan(params).promise()
	return data.Items
}

// add or update character
const addOrUpdateCharacter = async character => {
	const params = {
		TableName: TABLE_NAME,
		Item: character,
	}
	const data = await dynamoClient.put(params).promise()
	return data.Attributes
}

// delete character
const deleteCharacter = async id => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	}
	const data = await dynamoClient.delete(params).promise()
	return data.Attributes
}

// get character by id
const getCharacterById = async id => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	}
	const data = await dynamoClient.get(params).promise()
	return data.Item
}

module.exports = {
	getCharacters,
	addOrUpdateCharacter,
	deleteCharacter,
	getCharacterById,
}
