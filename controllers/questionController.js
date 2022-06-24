const Question = require('../models/Question');
const Level = require('../models/Level');

// @Method: Get
// @Route :  api/question
// @Desc  : Get all game quiz
exports.getAll = async (req, res, next) => {
  try {
    const allQuestion = await Question.find({ isDeleted: false }).populate(
      'level',
      'level'
    );
    return res.status(200).json(allQuestion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Get
// @Route :  api/question/:id
// @Desc  : Get a question with id
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question || question?.isDeleted) {
      return res.status(400).json({ message: 'Question not found' });
    }
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Post
// @Route :  api/question
// @Desc  : Crate new Question
exports.create = async (req, res, next) => {
  try {
    const {
      level,
      value,
      correctAnswer,
      incorrectAnswer,
      correctPoint,
      incorrectPoint,
    } = req.body;
    console.log(req.body);
    if (
      !level ||
      !value ||
      !correctAnswer ||
      !incorrectAnswer ||
      !correctPoint ||
      !incorrectPoint
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill all requirement field' });
    }

    const questionInstance = new Question({
      level,
      value,
      correctAnswer,
      incorrectAnswer,
      correctPoint,
      incorrectPoint,
    });
    const question = await questionInstance.save();

    await Level.findByIdAndUpdate(level, {
      $push: { questions: question._id },
    });

    return res.status(200).json({ message: `Questions added successfully!` });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route :  api/question/:id
// @Desc  : Update existing question
exports.update = async (req, res, next) => {
  try {
    const {
      value,
      correctAnswer,
      incorrectAnswer,
      correctPoint,
      incorrectPoint,
    } = req.body;
    const { id } = req.params;

    if (
      !value ||
      !correctAnswer ||
      !incorrectAnswer ||
      !correctPoint ||
      !incorrectPoint
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill all requirement field' });
    }

    await Question.findByIdAndUpdate(id, {
      $set: {
        value,
        correctAnswer,
        incorrectAnswer,
        correctPoint,
        incorrectPoint,
      },
    });

    return res.status(200).json({ message: `Questions Updated successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route :  api/question/status/:id
// @Desc  : Update status question
exports.statusUpdate = async (req, res, next) => {
  try {
    const [{ status }, { id }] = [req.body, req.params];

    await Question.findByIdAndUpdate(id, {
      $set: {
        status,
      },
    });

    return res.status(202).json({ message: `Questions status successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Delete
// @Route :  api/question/soft/:id
// @Desc  : Soft delete question
exports.softRemove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findQuestion = await Question.findById(id);
    if (!findQuestion) {
      return res.status(404).json({ message: 'Question not found!' });
    }

    await Question.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });

    await Level.findByIdAndUpdate(findQuestion.level, {
      $pull: { questions: id },
    });

    return res.status(202).json({ message: `Questions deleted successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Delete
// @Route :  api/question/:id
// @Desc  : Soft delete question
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findQuestion = await Question.findById(id);
    if (!findQuestion) {
      return res.status(404).json({ message: 'Question not found!' });
    }
    await Question.findByIdAndRemove(id);

    await Level.findByIdAndUpdate(findQuestion.level, {
      $pull: { questions: id },
    });

    return res
      .status(200)
      .json({ message: `Questions Permanently successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
