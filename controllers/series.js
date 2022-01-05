const Series = require('../models/Series');

// @Method: POST
// @Route : api/Series/create
// @Desc  : Handling the creation of Series
exports.createSeries = async (req, res, next) => {
    try {
        const {
            Title,
            Description,
            Client,
            Competency,
            LearningOutcomes,
            Dictionary,
            DictionaryDescription,
            TakeAway,
            CompletionCriteria,
            Status,
        } = req.body;

        if (!Title || !Status || !Client) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields.',
            });
        }
        if (!req.imageArr) {
            return res.status(400).json({
                message: 'image is required',
            });
        }
        if (req.imageArr.length > 1) {
            return res.status(400).json({
                Message: 'you can insert only One image for banner',
            });
        }
        let dupSeries = await Series.findOne({Title});
        if (dupSeries) {
            return res
                .status(400)
                .json({success: false, message: 'Series already exists'});
        }

        const clientArray = Client.split(',');
        const allSeries = [];

        const addItem = (id) => {
            return new Promise(async (resolve) => {
                const seriesInstance = new Series({
                    Title,
                    Description,
                    Competency,
                    LearningOutcomes,
                    Dictionary,
                    DictionaryDescription,
                    TakeAway,
                    Client: id,
                    CompletionCriteria,
                    Banner: req.imageArr,
                    Status,
                });
                const series = await seriesInstance.save();
                allSeries.push(series);
                resolve(true);
            });
        };

        const addAll = () => {
            const promises = clientArray.map((id) => addItem(id));
            return Promise.all(promises);
        };
        await addAll();

        return res.status(200).json({
            success: true,
            message: 'Series Added Sucessfully',
            data: allSeries,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Series/
// @Desc  : Get all Seriess
exports.getSeries = async (req, res) => {
    try {
        const Seriess = await Series.find().populate(
            'Client',
            'fullName localName'
        );
        res.status(200).json({success: true, data: Seriess});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Series/:id
// @Desc  : Get Series by id
exports.getSeriesById = async (req, res) => {
    try {
        let id = req.params.id;
        const series = await Series.findById(id);
        res.status(200).json({success: true, data: series});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: DELETE
// @Route : api/Series/:id
// @Desc  : Delete Series by id
exports.removeSeries = async (req, res) => {
    try {
        let id = req.params.id;
        const removeSeries = await Series.remove({_id: id});
        res.status(200).json({
            success: true,
            message: 'Series Deleted Successfully',
            data: removeSeries,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: PATCH
// @Route : api/Series/:id
// @Desc  : Handling the updation of Series
exports.updateSeries = async (req, res, next) => {
    try {
        const {
            Title,
            Description,
            Competency,
            LearningOutcomes,
            Dictionary,
            DictionaryDescription,
            TakeAway,
            CompletionCriteria,
            Status,
            Client,
        } = req.body;
        const id = req.params.id;
        if (!Title || !Status || !id || !Client) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields.',
            });
        }
        if (req.imageArr) {
            if (req.imageArr.length > 1) {
                return res.status(400).json({
                    Message: 'you can insert only One image for banner',
                });
            } else {
                const updatedSeries = await Series.updateOne(
                    {_id: id},
                    {
                        $set: {
                            Title: Title,
                            Description: Description,
                            Competency: Competency,
                            LearningOutcomes: LearningOutcomes,
                            TakeAway: TakeAway,
                            CompletionCriteria: CompletionCriteria,
                            Dictionary: Dictionary,
                            DictionaryDescription: DictionaryDescription,
                            Client: Client,
                            Banner: req.imageArr,
                            Status: Status,
                        },
                    }
                );
                res.status(200).json({
                    success: true,
                    message: 'Series Updated Successfully',
                    data: updatedSeries,
                });
            }
        } else {
            const updatedSeries = await Series.updateOne(
                {_id: id},
                {
                    $set: {
                        Title: Title,
                        Description: Description,
                        Competency: Competency,
                        LearningOutcomes: LearningOutcomes,
                        TakeAway: TakeAway,
                        CompletionCriteria: CompletionCriteria,
                        Dictionary: Dictionary,
                        DictionaryDescription: DictionaryDescription,
                        Client: Client,
                        Status: Status,
                    },
                }
            );
            res.status(200).json({
                success: true,
                message: 'Series Updated Successfully',
                data: updatedSeries,
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
