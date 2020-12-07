"use strict";
const e = require("express");
const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const getQuestion = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Quiz");
    const questionListLength = await database
      .collection("questions")
      .find()
      .toArray();

    let isNotRead = true;

    while (isNotRead) {
      let questionNumber =
        Math.floor(Math.random() * questionListLength.length) + 1;
      console.log("while in loop");
      const questionFound = await database
        .collection("questions")
        .findOne({id: questionNumber.toString()});

      console.log("questionFound: ", questionFound);

      if (questionFound.isRead == false) {
        console.log("in if statement");
        const noAnswers = questionFound.options.map((option) => {
          delete option["isCorrect"];
          return option;
        });

        const questionWithoutAnswer = {
          questionId: questionFound.id,
          question: questionFound.question,
          options: noAnswers,
        };

        res.status(200).send({
          status: "success",
          questionWithoutAnswer: questionWithoutAnswer,
          allQuestions: questionListLength.length,
        });
        isNotRead = false;
      }
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({status: "error 500", error: error.message});
  }
};

const checkAnswer = async (req, res) => {
  const {id, answerSelected} = req.body;
  console.log("id: ", id);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Quiz");
    const findAnswer = await database
      .collection("questions")
      .findOne({id: id.toString()});

    let userAnswer = findAnswer.options.find(
      (answer) => answer.value == answerSelected
    );
    let computerAnswer = findAnswer.options.find(
      (answer) => answer.isCorrect === true
    );

    await database
      .collection("questions")
      .updateOne({id: id.toString()}, {$set: {isRead: true}});

    userAnswer["isCorrect"] === true
      ? res.status(201).send({message: "Wait to Go!!!", correct: true})
      : res.status(201).send({
          message: `No Sorry, the correct answer was ${computerAnswer.label}`,
          correct: false,
        });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({message: "Something Went wrong"});
  }
};

module.exports = {
  getQuestion,
  checkAnswer,
};
