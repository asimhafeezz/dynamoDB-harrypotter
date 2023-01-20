const express = require("express")

// configurations
require("./config")()

const {
	getCharacters,
	addOrUpdateCharacter,
	deleteCharacter,
	getCharacterById,
} = require("./harryPotter")

const app = express()

// middlwares
app.use(express.json())

// routes
app.get("/", async (_, res) => {
	const data = await getCharacters()
	res.json({
		success: true,
		data,
	})
})

app.post("/", async (req, res) => {
	const character = req.body
	await addOrUpdateCharacter(character)
	res.send({
		success: true,
		message: "Character added successfully",
	})
})

app.delete("/:id", async (req, res) => {
	const id = req.params.id
	const data = await deleteCharacter(id)
	res.send({
		success: true,
		message: "Character deleted successfully",
		data,
	})
})

app.get("/:id", async (req, res) => {
	const id = req.params.id
	const data = await getCharacterById(id)
	if (!data)
		return res
			.status(404)
			.send({ success: false, message: "Character not found" })
	res.send({
		success: true,
		data,
	})
})

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
