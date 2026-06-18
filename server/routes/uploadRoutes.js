const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

router.post(
  "/",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const imageUrls = [];

      for (const file of req.files) {
        const result =
          await cloudinary.uploader.upload(
            file.path,
            {
              folder: "nestaway",
            }
          );

        imageUrls.push(result.secure_url);
      }

      res.json(imageUrls);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Image upload failed",
      });
    }
  }
);

module.exports = router;