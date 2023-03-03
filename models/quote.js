// using mondodb for database here folks

import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  attribution: {  // originator of quote (name)
    type: String,
    required: false
  },
  name: {  // the person submitting quote
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  approved: {  // has an admin approved this quote for display
    type: Boolean,
    required: true,
    default: true
  }
});

// module.exports = mongoose.model('Quote', quoteSchema);
const quoteModel = mongoose.model('Quote', quoteSchema);

export default quoteModel;