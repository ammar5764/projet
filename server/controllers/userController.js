
const User = require("../models/users");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ error });
  }
};


exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    var user = await User.findOne({ _id: id }).select('-password')
    res.status(200).send(user)
  } catch (error) {
    res.status(404).json({ 'id inconnu :': error })
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    var user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...body }
      },

      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ meassge: err })
      }
    ).select('-password');
    res.status(200).send(user)
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}


// exports.updateUser = async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           bio: req.body.bio
//         }
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true },
//       (err, docs) => {
//         if (!err) return res.send(docs)
//         if (err) return res.status(500).send({ message: err })
//       }
//     )
//   } catch (err) {
//     return res.status(400).json({ message: err })
//   }

// }

exports.deleteUser = async (req, res) => {
  try {
    await User.remove({
      _id: req.params.id
    }).exec(),
      res.status(200).json({ message: 'successfully deleted' })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};


exports.follow = async (req, res) => {
  try {
    //add to the follower list:
    await User.findByIdAndUpdate(
      req.params.id,//id du suiveur et dans son objet on met:
      { $addToSet: { following: req.body.idToFollow } }, //id de celui qui est suivi
      { new: true, upsert: true},
      (err, docs) => {
        if (!err) res.status(201).json(docs)
        else return res.status(400).json( err)
      }
    );
    //add to following list :
    await User.findByIdAndUpdate(
      req.body.idToFollow,//celui qui est suivi
      { $addToSet: { followers: req.params.id } },//id du suiveur
      { new: true, upsert: true },
      (err, docs) => {
        //  if (!err) res.status(201).json(docs) on peut pas mettre deux res status(l.87)
        if (err) return res.status(400).json(err)
      }
    )

  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

exports.unFollow = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,//id du suiveur et dans son objet on met:
      { $pull: { following: req.body.idToUnFollow } }, //id de celui qui est suivi
      { new: true, upsert: true},
      (err, docs) => {
        if (!err) res.status(201).json(docs)
        else return res.status(400).json( err)
      }
    );
    //add to following list :
    await User.findByIdAndUpdate(
      req.body.idToUnFollow,//celui qui est suivi
      { $pull: { followers: req.params.id } },//id du suiveur
      { new: true, upsert: true },
      (err, docs) => {
        //  if (!err) res.status(201).json(docs) on peut pas mettre deux res status(l.87)
        if (err) return res.status(400).json(err)
      }
    )
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}