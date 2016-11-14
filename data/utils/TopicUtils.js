"use strict";

let Question = require('../Question');
let ObjectiveUtils = require('./ObjectiveUtils');

/**
 * Contains Functions for doing common operations on the Topic data structure.
 */
class TopicUtils {

  /**
   * Constructor
   * @param {Topic} topic topic to be operated on
   */
  constructor(topic){
    this.topic = topic;
  }

  /**
   * Create a new Question
   * @param {String} questionTitle Title of Question
   * @param {String} questionDescription Description of Question
   */
  createQuestion(questionTitle, questionDescription) {
    let genID = this.topic.questionUID;
    this.topic.questionUID++;

    this.topic.questions.push(new Question(questionTitle, questionDescription, genID,this.topic.ID));
    
    return genID;
  }

  getQuestion(questionID){
    for(let question of this.topic.questions){
      if(question.ID === questionID)
        return question;
    }
    return undefined;
  }

  deleteQuestion(questionID){
    for(let i=0;i<this.topic.questions.length;i++){
      if(this.topic.questions[i].ID === questionID){
        let question = this.topic.questions[i];

        //Remove objective reference to question
        for(let objective of this.topic.questions[i].objectives){
          new ObjectiveUtils(objective).removeQuestionUID(this.topic.questions[i].UID);
        }

        this.topic.questions.splice(i,1);
        return;
      }
    }
  }
}

module.exports = TopicUtils;