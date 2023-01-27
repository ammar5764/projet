const  Blog  = require("../models/blog");

exports.create_blog = (req, res) => {
  let blog = new Blog({ ...req.body }); // MyModel.create(docs)fait new MyModel(doc).save()pour chaque doc dans docs.
  blog.save().then(
    (doc) => {
      res.status(200).send("create successfully");
    },
    (error) => {
      res.status(400).send(error);
    }
  );
};

exports.get_blogs = async (req, res) => {
  try {
    const users = await Blog.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ error });
  }
};

exports.get_blog = (req, res) => {
  const id = req.params.id;
  Blog.findOne({ _id: id })
    .then((blog) => {
      res.status(200).send(blog);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.update_blog = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Blog.updateOne({ _id: id }, { ...body })
    .then(() => {
      res.status(200).send("update successfully");
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.delete_blog = (req, res) => {
  const id = req.params.id;
  Blog.deleteOne({ _id: id })
    .then(() => {
      res.status(200).send("delete successfully");
    })
    .catch((error) => res.status(400).json({ error }));
};
