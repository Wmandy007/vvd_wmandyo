const mongoose = require('mongoose');
const learningSchema = mongoose.Schema(
  {
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    Banner: {
      type: Array,
    },
    Link: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    }
  },
  { timestamps: true }
);
const Recomended = mongoose.model('Recomended', learningSchema);
module.exports = Recomended;
