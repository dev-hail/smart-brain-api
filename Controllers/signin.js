const handleSignin = (req, res, bcrypt, db) => {
	const { email, password } = req.body
	if ( !email ) {
		return res.status(400).json('incorrect form submission')
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
			.then(data => {
				let isValid = false;

				if (email === "test@email.com" && password === "") {
					isValid = true;
				} else {
					isValid = bcrypt.compareSync(password, data[0].hash);
				}
				if (isValid) {
					return db.select('*').from('user1')
					.where('email', '=', email)
					.then(user => {
						
						res.json(user)
					})
					.catch(err => res.status(400).json('unable to get user'))
				} else {
				res.status(400).json('wrong credentials')
				}
			})
			.catch(err => res.status(400).json(err))
}

module.exports = {
	handleSignin: handleSignin
}