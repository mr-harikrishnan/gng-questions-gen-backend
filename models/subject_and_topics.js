
const mongoose = require("mongoose");


const SubjectAndTopicsSchema = new mongoose.Schema({
  subject: String,       // Subject name
  topics: [String]       // Array of topics
});

// Create the model
const SubjectAndTopics = mongoose.model("SubjectAndTopics", SubjectAndTopicsSchema);

module.exports = { SubjectAndTopics };