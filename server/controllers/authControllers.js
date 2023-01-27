
const User = require("../models/users");

exports.getOneUser = async (req, res) => {
    console.log(req.params);
  
   try {
    const id = req.params.id;
    var user=await User.findOne({ _id: id}).select('-password')
    res.status(200).send(user)
  } catch (error) {
    res.status(404).json({'id inconnu :' : error })
  }
}
  ;