const Package = require("../models/package");

//getting all packages
const package_index = async (req, res) => {
  const packages = await Package.find({});
  if (packages.length === 0) {
    res.json("You have no incoming package").end();
  }

  try {
    res.json(packages);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get  package details
const package_details = async (req, res) => {
  const id = req.params.id;
  const package = await Package.findById(id);

  if (package) {
    res.json(package);
  } else {
    res.status(404).end();
  }
};

//create new package
const package_create = async (req, res) => {
  const body = req.body;

  if (!body) {
    res.status(400).json({
      error: "Content missing please fill in the form",
    });
  }
  const package = new Package({
    store: body.store,
    notes: body.notes,
    status: false,
  });
  try {
    await package.save();
    res.json(package);
  } catch (error) {
    res.status(500).send(error);
  }
};

//update package details
const package_update = async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const result = await Package.findByIdAndUpdate(id, updateInfo);
    await result.save();
    res.json("Successfully updated");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//delete package
const package_delete = async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);

    if (!package) {
      res.status(404).send();
    } else {
      res.status(200).json("Successfully deleted.");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  package_index,
  package_details,
  package_create,
  package_update,
  package_delete,
};
