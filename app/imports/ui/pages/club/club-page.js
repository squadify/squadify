import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

const stopwords = require('stopwords').english;
const natural = require('natural');

const mimir = require('mimir');
const brain = require('brain');

const tfidf = mimir.tfidf;
const net = new brain.NeuralNetwork();

var ANN_Classes = {
      COMERCIAL: 0,
      SOCIAL: 1,
      INFORMATIONAL: 2
    },
    classes_array = Object.keys(ANN_Classes);

function tfidfRun(textlist) {
  console.log(textlist);
  textlist.forEach(function (t, index) {
    console.log('Most important words in document', index + 1);
    var scores = {};
    t.split(' ').forEach(function (word) {
      scores[word] = tfidf(word, t, textlist);
    });
    scores = Object.keys(scores).map(function (word) {
      return {
        word: word,
        score: scores[word]
      }
    });
    scores.sort(function (a, b) {
      return a.score < b.score ? 1 : -1;
    });
    //console.log(scores.splice(0, 3));
    return scores;
  });
}

function vec_result(res, num_classes) {
  let i = 0;
  let vec = [];
  for (i; i < num_classes; i += 1) {
    vec.push(0);
  }
  vec[res] = 1;
  return vec;
}

function maxarg(array) {
  return array.indexOf(Math.max.apply(Math, array));
}

Template.Club_Page.onCreated(function onCreated() {
});

Template.Club_Page.helpers({
});

Template.Club_Page.events({
  'click .huge.green.button': function () {
    console.log('apply');
    FlowRouter.route('/');
  },
  'click .save': function () {
    const element = document.getElementById('e');
    const data = element.innerText;
    let textWithoutStopwords =
        data.split(/\W+/)
            .filter((w)=> { return stopwords.indexOf(w.toLowerCase()) < 0 })
    .map( (word)=> {
      return natural.PorterStemmer.stem(word);
     })
    .join(' ');
    //console.log(textWithoutStopwords);
    let input = tfidfRun([textWithoutStopwords]);
    let output = classes_array.SOCIAL;

    const ann_train = {
        input: input,
        output: output,
    };

    net.train(ann_train);
  },
});
