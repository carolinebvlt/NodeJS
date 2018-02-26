var express = require ('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/assets'));

app.get('/', function(rq, rs){
    rs.render('home.ejs');
});
app.get('/test/getQuestion/:id', function(rq, rs){

    var content = fs.readFileSync('assets/json/questions.json');
    var data = JSON.parse(content);
    var Question;
    data.forEach(function(Q){
      if(Q.id == rq.params.id){
        Question = Q;
      }
    });
    rs.render('test.ejs', {question: Question.question, answers:Question.answers});
});
app.post('/test/getNext', urlencodedParser, function(rq, rs){
  nextQuestion = rq.body.theAnswer; // retourne le nextId
  switch (nextQuestion) {
    case "Python": case "C": case "C++": case "C#": case "Java": case "JavaScript": case "PHP": case "Ruby": case "Scratch": case "Objective-C":
      rs.render('result.ejs', {language:nextQuestion});
      break;
    default:
      rs.redirect('/test/getQuestion/'+ nextQuestion);
      break;
  }
});
server.listen(7000);
