require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "administrator", password: "welcome", password_confirmation: "welcome")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank", "First name is too short (minimum is 3 characters)"], @user.errors.full_messages
  end

  def test_last_name_should_be_present
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank", "Last name is too short (minimum is 3 characters)"], @user.errors.full_messages
  end

  def test_email_should_be_present
    @user.email = ""
    assert_not @user.valid?
    assert_equal ["Email can't be blank", "Email is invalid"], @user.errors.full_messages
  end

  def test_first_name_should_of_valid_length
    @user.first_name = "first_name_which_is_very_long" * 10
    assert_not @user.valid?
    assert_equal ["First name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_last_name_should_of_valid_length
    @user.last_name = "last_name_which_is_very_long" * 10
    assert_not @user.valid?
    assert_equal ["Last name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_email_should_be_unique
    @user.save!
    @new_user = User.new(first_name: "Sam", last_name: "Curran", email: "sam@example.com", password: "welcome", password_confirmation: "welcome")
    assert_not @new_user.valid?
    assert_equal ["Email has already been taken"], @new_user.errors.full_messages
  end

  def test_email_should_be_saved_as_lowercase
    @user.email = "SAM@example.com"
    @user.save!
    assert @user.valid?
    assert_equal "sam@example.com", @user.email
  end

  def test_should_accept_valid_email_addresses
    valid_emails = ["sam@Example.com", "SaM@example.com", "sam@example.co.in", "sam@example.gov.in", "sam-smith@example.com", "sam.smith@example.com"]
    valid_emails.each do |valid_email|
      @user.email = valid_email
      assert @user.valid?
    end
  end
  
  def test_should_reject_invalid_email_addresses
    invalid_emails = ["sam_at_example.com", "sam@example,com", "sam@example", "sam!example#.com", "sam@example.", "sam @example.com"]
    invalid_emails.each do |invalid_email|
      @user.email = invalid_email
      assert @user.invalid?
    end
  end

  def test_email_is_case_insensitive
    @user.save!
    @new_user = User.create(first_name: "Sam", last_name:"Curran", email: "SAM@example.com", password: "welcome", password_confirmation: "welcome")
    assert_not @new_user.valid?
    assert_equal ["Email has already been taken"], @new_user.errors.full_messages
  end

  def test_user_should_have_valid_role
    @user.role = nil
    assert @user.invalid?
    assert_equal ["Role can't be blank"], @user.errors.full_messages
  end

  def test_password_should_not_be_blank
    @user.password = nil
    assert @user.invalid?
    assert_equal ["Password can't be blank"], @user.errors.full_messages
  end

  def test_password_should_have_minimum_length
    @user.password = "hello"
    @user.password_confirmation = "hello"
    assert @user.invalid?
    assert_equal ["Password is too short (minimum is 6 characters)", "Password confirmation is too short (minimum is 6 characters)"], @user.errors.full_messages
  end

  def test_password_and_password_confirmation_should_match
    @user.password = "some_random_password"
    @user.password_confirmation = "some_random_password"
    assert @user.valid?
    assert_equal @user.password, @user.password_confirmation
  end

  def test_password_and_invalid_password_confirmation_should_match
    @user.password = "some_random_password"
    @user.password_confirmation = "some_secret_password"
    assert @user.invalid?
    assert_equal ["Password confirmation doesn't match Password", "Password confirmation doesn't match Password"], @user.errors.full_messages
  end
end
