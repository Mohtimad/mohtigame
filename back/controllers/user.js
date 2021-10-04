exports.signup = (req, res) => {
    res.status(201).json({ message: 'CREATE OK' })
};

exports.login = (req, res) => {
    res.status(201).json({ message: 'READ OK' })
};

exports.edit = (req, res) => {
    res.status(201).json({ message: 'UPDATE OK' })
};

exports.delete = (req, res) => {
    res.status(201).json({ message: 'DELETE OK' })
};