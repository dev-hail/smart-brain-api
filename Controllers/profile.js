const handleProfile = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('user1').where({id}).then(user => {
		if (user.length) {
			res.json(user[0])
		}else{
			res.status(400).json("not found")
		}
	})
	.catch(err => res.status(400).json("error getting user"))
}

module.exports = {
	handleProfile: handleProfile
}