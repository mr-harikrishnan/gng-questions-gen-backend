const express = require("express")
const app = express()  //1
const cors = require("cors") //2
app.use(cors(["http://localhost:5173/"])) //for front end 
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/questions_db")
const { Question } = require("./models/question")
const { SubjectAndTopics } = require("./models/subject_and_topics")

app.use(express.json()) //body la vara datava directahh req ku send pannu json type la

// ------------------------------------


app.post("/questions", async function (req, res) {
  try {
    let question = new Question(req.body)
    await question.save()
    res.json({ message: "create successfull" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "something wentwrong" })
  }
})

// GET - Get all questions
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET - Get a question by ID
app.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// PUT - Update a question by ID
app.put("/question/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuestion) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Update successful", updatedQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// DELETE - Delete a question by ID
app.delete("/question/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Delete successful", deletedQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// -------------
// POST - Create a new subject with topics
app.post("/subjectandtopics", async (req, res) => {
  try {
    const subject = new SubjectAndTopics(req.body);
    await subject.save();
    res.json({ message: "Subject created successfully", subject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET - Get all subjects and topics
app.get("/subjectandtopics", async (req, res) => {
  try {
    const subjects = await SubjectAndTopics.find();
    res.json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// GET - Get a subject by ID
app.get("/subjectandtopics/:id", async (req, res) => {
  try {
    const subject = await SubjectAndTopics.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.json(subject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// PUT - Update a subject by ID
app.put("/subjectandtopics/:id", async (req, res) => {
  try {
    const updatedSubject = await SubjectAndTopics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubject) return res.status(404).json({ message: "Subject not found" });
    res.json({ message: "Update successful", updatedSubject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// DELETE - Delete a subject by ID
app.delete("/subjectandtopics/:id", async (req, res) => {
  try {
    const deletedSubject = await SubjectAndTopics.findByIdAndDelete(req.params.id);
    if (!deletedSubject) return res.status(404).json({ message: "Subject not found" });
    res.json({ message: "Delete successful", deletedSubject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.listen(3000)