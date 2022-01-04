// @Method: POST
// @Route : api/uploadimage/
// @Desc  : Handling the creation of images
exports.uploadMedia = async (req, res) => {
    try {
        if (!req.imageArr) {
            if(!req.query.is_doc){
                return res.status(400).json({
                    message: "image is required",
                });
            }
        }
        return res.status(200).json({
            success: true,
            message: "Image Uploaded Sucessfully",
            data: req.imageArr,
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};
