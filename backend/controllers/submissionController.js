import Submission from '../models/Submission.js';
import Test from '../models/Test.js';
import User from '../models/User.js';

// Submit test answers and generate score/review
export const submitTest = async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!testId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    // Get the test with correct answers
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Calculate score and generate detailed review
    const reviewAnswers = [];
    let correctCount = 0;

    for (let i = 0; i < test.questions.length; i++) {
      const question = test.questions[i];
      const userAnswer = answers[i] || '';
      const isCorrect = userAnswer === question.answer;
      
      if (isCorrect) correctCount++;

      // Use custom explanation if available, otherwise generate default
      let explanation = '';
      if (question.explanation && question.explanation.trim() !== '') {
        // Use custom explanation from the question
        if (isCorrect) {
          explanation = `✅ Correct! ${question.explanation}`;
        } else {
          explanation = `❌ Incorrect. You selected "${userAnswer}", but the correct answer is "${question.answer}". ${question.explanation}`;
        }
      } else {
        // Fallback to default explanation
        if (isCorrect) {
          explanation = `✅ Correct! "${question.answer}" is the right answer.`;
        } else {
          explanation = `❌ Incorrect. You selected "${userAnswer}", but the correct answer is "${question.answer}".`;
        }
      }

      reviewAnswers.push({
        questionId: question._id,
        question: question.question,
        options: question.options,
        userAnswer: userAnswer,
        correctAnswer: question.answer,
        isCorrect: isCorrect,
        explanation: explanation
      });
    }

    const totalQuestions = test.questions.length;
    const score = correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Create submission record
    const submission = await Submission.create({
      userId: userId,
      testId: testId,
      testName: test.testname,
      answers: reviewAnswers,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      timeTaken: timeTaken || 0
    });

    // Return detailed results
    res.json({
      submissionId: submission._id,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      passed: percentage >= 60, // 60% passing grade
      timeTaken: timeTaken || 0,
      review: reviewAnswers,
      message: `You scored ${score}/${totalQuestions} (${percentage}%)`
    });

  } catch (error) {
    console.error('Test submission error:', error);
    res.status(500).json({ message: "Failed to submit test" });
  }
};

// Get user's submission history
export const getSubmissionHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const submissions = await Submission.find({ userId })
      .select('testName score totalQuestions percentage submittedAt timeTaken')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error('Get submission history error:', error);
    res.status(500).json({ message: "Failed to get submission history" });
  }
};

// Get detailed submission review by ID
export const getSubmissionReview = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const userId = req.user._id;

    const submission = await Submission.findOne({ 
      _id: submissionId, 
      userId: userId 
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json({
      submissionId: submission._id,
      testName: submission.testName,
      score: submission.score,
      totalQuestions: submission.totalQuestions,
      percentage: submission.percentage,
      passed: submission.percentage >= 60,
      submittedAt: submission.submittedAt,
      timeTaken: submission.timeTaken,
      review: submission.answers
    });

  } catch (error) {
    console.error('Get submission review error:', error);
    res.status(500).json({ message: "Failed to get submission review" });
  }
};

// Admin: Get all submissions for a specific test
export const getTestSubmissions = async (req, res) => {
  try {
    const { testId } = req.params;

    const submissions = await Submission.find({ testId })
      .populate('userId', 'name email')
      .select('userId score totalQuestions percentage submittedAt timeTaken')
      .sort({ submittedAt: -1 });

    // Calculate statistics
    const totalSubmissions = submissions.length;
    const averageScore = submissions.length > 0 
      ? submissions.reduce((sum, sub) => sum + sub.percentage, 0) / totalSubmissions 
      : 0;
    
    const passedCount = submissions.filter(sub => sub.percentage >= 60).length;
    const passRate = totalSubmissions > 0 ? (passedCount / totalSubmissions) * 100 : 0;

    res.json({
      submissions,
      statistics: {
        totalSubmissions,
        averageScore: Math.round(averageScore),
        passedCount,
        passRate: Math.round(passRate)
      }
    });

  } catch (error) {
    console.error('Get test submissions error:', error);
    res.status(500).json({ message: "Failed to get test submissions" });
  }
};
