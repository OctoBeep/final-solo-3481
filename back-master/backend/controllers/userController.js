const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config/global');

exports.obtenerUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send("El usuario no existe");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                auth: false,
                token: null
            });
        }

        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 * 24 });
        return res.json({ auth: true, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};