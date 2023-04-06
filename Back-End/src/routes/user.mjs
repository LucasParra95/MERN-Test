import express  from "express";
import userSchema from "../models/user.mjs";

const router = express.Router();

//New Userdata
router.post('/users', (req,res) => {
    const user = userSchema(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
});

router.get('/users', (req,res) => {
    userSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

export default router;