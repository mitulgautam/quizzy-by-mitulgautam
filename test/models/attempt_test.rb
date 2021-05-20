require 'test_helper'

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "administrator", password: "welcome", password_confirmation: "welcome")
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @question = @quiz.questions.build(name: "Which planet is nearest to mars?")
    @question.options.build(name: "Earth")
    @question.options.build(name: "Jupiter")
    @question.options.build(name: "Pluto")
    @question.correct_option = 1

    @attempt = @user.attempts.build(submitted: false, quiz: @quiz)
  end

  def test_attempt_should_valid
    assert @attempt.valid?
  end

  def test_attempt_should_not_have_invalid_user
    @attempt.user = nil
    assert @attempt.invalid?
    assert_equal ["User must exist", "User can't be blank"], @attempt.errors.full_messages
  end

  def test_attempt_should_not_have_invalid_quiz
    @attempt.quiz = nil
    assert @attempt.invalid?
    assert_equal ["Quiz must exist", "Quiz can't be blank"], @attempt.errors.full_messages
  end
end
