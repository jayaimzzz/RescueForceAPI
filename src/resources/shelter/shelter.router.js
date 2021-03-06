const express = require("express");
const controllers = require("./shelter.controllers");
const upload = require("../../utils/imageUpload");
const { hostAndShelterOnly, shelterOnly } = require("../../utils/auth");

const router = express.Router();

router
  .route("/")
  .get(controllers.getMany)
  .post(hostAndShelterOnly, controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOne)
  .patch(shelterOnly, controllers.updateOne)
  .delete(shelterOnly, controllers.removeOne);

router
  .route("/:id/photos")
  .put(shelterOnly, upload.single("image"), controllers.replacePhoto)

module.exports = router;
