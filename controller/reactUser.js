const userModel = require("../model/user");
const { default: mongoose } = require("mongoose");

let isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

let isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};
let isValidNumber = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "number" && value.length === 0) return false;
  return true;
};

const createUser = async function (req, res) {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter data in form" });
    }

    if (!isValidString(data.name)) {
      return res.status(400).send({ status: false, msg: "Please enter name" });
    }

    if (!isValidString(data.email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter email ID" });
    }
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!emailRegex.test(data.email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid email ID" });
    }
    let mobileRegex =
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
    if (!mobileRegex.test(data.phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid mobile number" });
    }

    if (!isValidNumber(data.phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a phone number" });
    }

    let createdData = await userModel.create(data);
    return res.status(200).send({
      status: true,
      msg: "User created succesfully",
      userData: createdData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getAllUser = async function (req, res) {
  try {
    let getUser = await userModel.find();
    if (getUser.length < 1) {
      return res.status(400).send({ status: false, msg: "No user found" });
    }
    return res.status(200).send({ status: true, userData: getUser });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const updateUser = async function (req, res) {
  try {
    let id = req.params.id;
    let data = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ status: false, msg: "UserID is invalid" });
    }

    const checkId = await userModel.findById({ _id: id });

    if (!checkId)
      return res
        .status(400)
        .send({ status: false, msg: "User does not exist" });

    if (!data)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide data to update" });
    if (!isValidString(data.name)) {
      return res.status(400).send({ status: false, msg: "Please enter name" });
    }

    if (!isValidString(data.email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter email ID" });
    }
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!emailRegex.test(data.email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid email ID" });
    }

    let mobileRegex =
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
    if (!mobileRegex.test(data.phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid mobile number" });
    }
    if (!data.phone || typeof data.phone !== "number") {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a phone number" });
    }

    let updatedData = await userModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    return res.status(200).send({ status: true, msg: updatedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err });
  }
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
};
