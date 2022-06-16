const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("MovieWiz");
        
        if (_db.collection('Quizzes').countDocuments() == 0){
            let quiz = {
              quizName: 'HorrorQuiz',
              
              quizQuestions: [
                  
                { QuizQuestion: {
                    isMulti: true,
                    id:  '',
                    question: 'Which of the following movies was NOT directed by Alfred Hitchcock?',
                    answers: [{answerText: 'tt0056869'}, {answerText: 'tt0075005'} 
                    ,{answerText: 'tt0054215'}, {answerText: 'tt0052357'}],
                    correctIndex: 1
                  }
                },
                { QuizQuestion: {
                  isMulti: false,
                  id:  'tt0094862',
                  question: 'In what year was the movie Child’s Play released?',
                  answers: [{answerText: '1988'}, {answerText: '1995'} 
                  ,{answerText: '1980'}, {answerText: '1977'}],
                  correctIndex: 0
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'Which of the following movies does NOT have a sequel?',
                  answers: [{answerText: 'tt1591095'}, {answerText: 'tt0117571'} 
                  ,{answerText: 'tt1130884'}, {answerText: 'tt1457767'}],
                  correctIndex: 2
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'In which horror film do assassins wear fox, tiger, and lamb masks?',
                  answers: [{answerText: 'tt0098084'}, {answerText: 'tt0080761'} 
                  ,{answerText: 'tt0087800'}, {answerText: 'tt1853739'}],
                  correctIndex: 3
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'Which film is directed by Ari Aster?',
                  answers: [{answerText: 'tt0081505'}, {answerText: 'tt7784604'} 
                  ,{answerText: 'tt2724064'}, {answerText: 'tt1179891'}],
                  correctIndex: 1
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'The quote, “Do you like scary movies?” was made famous by which of the following movies?',
                  answers: [{answerText: 'tt0081505'}, {answerText: 'tt0054215'} 
                  ,{answerText: 'tt0077651'}, {answerText: 'tt0117571'}],
                  correctIndex: 3
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'The quote, “Do you like scary movies?” was made famous by which of the following movies?',
                  answers: [{answerText: 'tt0081505'}, {answerText: 'tt0054215'} 
                  ,{answerText: 'tt0077651'}, {answerText: 'tt0117571'}],
                  correctIndex: 3
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'Actress Marilyn Burns starred in which of the following films?',
                  answers: [{answerText: 'tt0083624'}, {answerText: 'tt0072271'} 
                  ,{answerText: 'tt4935372'}, {answerText: 'tt0103919'}],
                  correctIndex: 1
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'Which of the following films involved the death of nine individuals during its production?',
                  answers: [{answerText: 'tt0119345'}, {answerText: 'tt0054215'} 
                  ,{answerText: 'tt0091064'}, {answerText: 'tt0070047'}],
                  correctIndex: 3
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'Which of the following movies was NOT based on a novel by Stephen King?',
                  answers: [{answerText: 'tt0085407'}, {answerText: 'tt0087050'} 
                  ,{answerText: 'tt0387564'}, {answerText: 'tt0091499'}],
                  correctIndex: 2
                  }
                },
                { QuizQuestion: {
                  isMulti: true,
                  id:  '',
                  question: 'Which movie was originally titled “The Babysitter Murders”?',
                  answers: [{answerText: 'tt0117571'}, {answerText: 'tt0077651'} 
                  ,{answerText: 'tt0063522'}, {answerText: 'tt0087800'}],
                  correctIndex: 2
                  }
                }

              ]
            };
            _db.collection('Quizzes').insertOne(quiz, function(err, res) {
              if (err) throw err
            });
        }
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};