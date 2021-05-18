require 'test_helper'

class QuestionTest < ActiveSupport::TestCase

  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "administrator", password: "welcome", password_confirmation: "welcome")
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @question = @quiz.questions.build(name: "Which planet is nearest to mars?")
    @question.options.build(name: "Earth")
    @question.options.build(name: "Jupiter")
    @question.options.build(name: "Pluto")
    @question.correct_option = 1
  end

  def test_valid_question
    assert @question.valid?
  end

  def test_should_not_have_invalid_correct_option
    @question.correct_option = nil
    assert @question.invalid?
    assert_equal ["Correct option can't be blank"], @question.errors.full_messages
  end

  def test_should_have_valid_name
    @question.name = nil
    assert @question.invalid?
    assert_equal ["Name can't be blank"], @question.errors.full_messages
  end

  def test_should_have_maximum_options
    @question.options.build(name: "Moon")
    @question.options.build(name: "Venus")
    assert @question.invalid?
    assert_equal ["Max 4 options can be added to a question."], @question.errors.full_messages
  end

  def test_should_have_minimum_options
    @question.options = []
    assert @question.invalid?
    assert_equal ["Min 2 options are required to create a question", "Options can't be blank"], @question.errors.full_messages
  end
end
