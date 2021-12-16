
// @Method: POST
// @Route : api/uploadimage/
// @Desc  : Handling the creation of images
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.imageArr) {
      return res.status(400).json({
        message: "image is required",
      });
    }
    res.status(200).json({
      success: true,
      message: "Image Uploaded Sucessfully",
      data: req.imageArr,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
