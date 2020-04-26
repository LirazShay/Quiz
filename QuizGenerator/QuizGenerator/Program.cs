using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace QuizGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var quizData = new QuizData();
            var input = File.ReadAllText("input.txt");
            var quiz = CreateQuiz(input, 1);
            quizData.Quizlist.Add(quiz);
            quiz = CreateQuiz(input, 2);
            quizData.Quizlist.Add(quiz);
            var res = quizData.ToJson();
            File.WriteAllText("Data.json", res);
        }

        private static Quiz CreateQuiz(string input, int level)
        {
            /*
             * foreach sentence
                 for each word
                  create sentence with this word hidden - replaced by underscores
                  save the hidden word with it
                  add this sentence to results lists
                 in the end shuffle all sentences in the results
                 add it to final results list
                create json
             */
            var quiz = new Quiz(level);
            var sentences = input.Split('.');

         
            for (int senIdx = 0; senIdx < sentences.Length; senIdx++)
            {
                string sen = sentences[senIdx].Trim();
                var senItems = new List<QuizItem>();
                var wordsIndexes = sen.AllIndexesOf(" ").Select(a => ++a).ToList();
                wordsIndexes.Insert(0, 0);
                var words = sen.Split(' ');
                for (int wordIdx = 0; wordIdx < words.Length; wordIdx++)
                {
                    string word = words[wordIdx];
                    var wordLen = word.Count(a => char.IsLetter(a));
                    var hiddenWord = string.Join("", Enumerable.Repeat("_", wordLen));
                    var quest = sen.Remove(wordsIndexes[wordIdx], word.Length).Insert(wordsIndexes[wordIdx], hiddenWord);
                    var response = new string(word.Where(a => char.IsLetter(a)).ToArray());
                    QuizItem item = new QuizItem() { Question = quest, Response = response };
                    senItems.Add(item);
                }
                if(level == 2)
                 senItems.Shuffle();
                quiz.QuizItems.AddRange(senItems);
            }
            return quiz;

        }
    }

}

