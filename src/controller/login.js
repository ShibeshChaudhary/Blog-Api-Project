const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
    
        const user = await User.findOne({ email } );
        if (!user)
            return res.status(404).json({ msg: "Invalid email or password" });

   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ msg: "Incorrect password" });

        const token = jwt.sign(
            { id: user.id ,role:user.role},
            "secretchibi",
            { expiresIn: "3d" }
        );


        res.json({
            msg: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role:user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
