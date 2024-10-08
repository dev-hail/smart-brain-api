
const handleRegister = (req, res, bcrypt, db) => {
	const { email, name, password } = req.body;
	if ( !email || !name || !password ) {
		return res.status(400).json('incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('user1')
					.returning('*')
					.insert({
						email: email,
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]);
					})
					})
					.then(trx.commit)
					.catch(err => {
						console.error('Transaction error:', err);
						trx.rollback();
						res.status(400).json("unable to register");
					  });
					})
					.catch(err => {
					  console.error('Database error:', err); 
					  res.status(400).json("unable to register");
					});
}

module.exports = {
	handleRegister: handleRegister
}