require 'test_helper'

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "administrator", password: "welcome", password_confirmation: "welcome")
    @quiz = Quiz.new(name: "Pokemon Quiz Test", user: @user);
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_should_have_valid_user
    @quiz.user_id = nil
    assert_not @quiz.valid?
    assert_equal ["User must exist", "User can't be blank"], @quiz.errors.full_messages
  end

  def test_name_should_be_present
    names = ["", nil, "   "]

    names.each do |name|
      @quiz.name = name
      assert_not @quiz.valid?
      assert_equal ["Name can't be blank", "Name is too short (minimum is 10 characters)"], @quiz.errors.full_messages
    end
  end

  def test_name_should_of_valid_length
    @quiz.name = "Pokemon"
    assert_not @quiz.valid?
    assert_equal ["Name is too short (minimum is 10 characters)"], @quiz.errors.full_messages
  end
end
