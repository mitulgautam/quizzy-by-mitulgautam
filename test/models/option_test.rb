require 'test_helper'

class OptionTest < ActiveSupport::TestCase

  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "administrator", password: "welcome", password_confirmation: "welcome")
    @quiz = @user.quizzes.build(name: "Solar System Quiz")
    @question = @quiz.questions.build(name: "Which planet is nearest to mars?")
    @option = @question.options.build(name: "Earth")
    @option = @question.options.build(name: "Jupiter")
    @question.correct_option = 1
  end

  def test_valid_option
    assert @option.valid?
  end

  def test_should_have_valid_option_name
    @option.name = ""
    assert @option.invalid?
    assert_equal ["Name can't be blank"], @option.errors.full_messages
  end
end
