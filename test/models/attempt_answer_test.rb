require 'test_helper'

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "administrator", password: "welcome", password_confirmation: "welcome")
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @question = @quiz.questions.build(name: "Which planet is nearest to mars?")
    @question.options.build(name: "Earth")
    @question.options.build(name: "Jupiter")
    @question.options.build(name: "Pluto")
    @question.correct_option = 1
    @attempt = @user.attempts.build(submitted: false, quiz: @quiz)
    @attempt_answer = @attempt.attempt_answers.build(question: @question, option: @question.options.first)
  end

  def test_attempt_answer_should_be_valid
    assert @attempt_answer.valid?
    assert_equal [], @attempt_answer.errors.full_messages
  end

  def test_attempt_answer_should_not_have_invalid_option
    @attempt_answer.option = nil
    assert @attempt_answer.invalid?
    assert_equal ["Option must exist", "Option can't be blank"], @attempt_answer.errors.full_messages
  end

  def test_attempt_answer_should_not_have_invalid_question
    @attempt_answer.question = nil
    assert @attempt_answer.invalid?
    assert_equal ["Question must exist", "Question can't be blank"], @attempt_answer.errors.full_messages
  end
end
