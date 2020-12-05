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
  let randomNumber = Math.floor(Math.random() * 15) + 1;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Quiz");
    const questionFound = await database
      .collection("questions")
      .findOne({id: randomNumber.toString()});

    const noAnswers = questionFound.options.map((option) => {
      delete option["isCorrect"];
      return option;
    });

    const questionWithoutAnswer = {
      questionId: questionFound.id,
      question: questionFound.question,
      options: noAnswers,
    };

    res
      .status(200)
      .send({status: "success", questionWithoutAnswer: questionWithoutAnswer});
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

    userAnswer.isCorrect
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
