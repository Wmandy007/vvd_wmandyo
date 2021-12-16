const Client = require("../models/Client");

// @Method: POST
// @Route : api/client/create
// @Desc  : Handling the creation of client
exports.createClient = async (req, res, next) => {
  try {
    const { fullName, Country } = req.body;
    if (!fullName || !Country) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields.",
      });
    }
    let dupClient = await Client.findOne({ fullName });
    if (dupClient) {
      return res
        .status(400)
        .json({ success: false, message: "Client already exists" });
    }
    let client = await Client.create({
      fullName,
      Country,
    });
    res.status(200).json({
      success: true,
      message: "Client Added Sucessfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/client/
// @Desc  : Get all client
exports.getClient = async (req, res) => {
  try {
    const ClientData = await Client.find();
    res.status(200).json({ success: true, data: ClientData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/client/:id
// @Desc  : Get client by id
exports.getClientById = async (req, res) => {
  try {
    let id = req.params.id;
    const ClientData = await Client.findById(id);
    res.status(200).json({ success: true, data: ClientData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: DELETE
// @Route : api/client/:id
// @Desc  : Delete client by id
exports.removeClient = async (req, res) => {
  try {
    let id = req.params.id;
    const removeClient = await Client.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: "Client Deleted Successfully",
      data: removeClient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: PATCH
// @Route : api/client/:id
// @Desc  : Handling the updation of client
exports.updateClient = async (req, res, next) => {
  try {
    const { fullName, Country } = req.body;
    const id = req.params.id;
    if (!fullName || !Country) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields.",
      });
    }
    const updatedClient = await Client.updateOne(
      { _id: id },
      {
        $set: {
          fullName: fullName,
          Country: Country,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Client Updated Successfully",
      data: updatedClient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
