class Api::PublicController < ApplicationController
  before_action :set_quiz, only: [:create, :show]
  before_action :published_status, except: [:update, :result]
  before_action :set_standard_user, only: [:create]
  skip_before_action :authenticate_user
  skip_before_action :set_current_user
  before_action :set_attempt, only: [:update, :result]
  before_action :attempt_check, only: [:update]
  before_action :validate_options, only: [:update]

  def show
    render json: @quiz, serializer: QuizQuestionSerializer, status: :ok
  end

  def create
    @attempt = Attempt.new(quiz: @quiz, user: @standard_user)
    if @attempt.save
      render json: {notice: "Attempt has been created sucessfully.", attempt: @attempt}, status: :ok
    else
      render json: {error: @attempt.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @attempt.update(attempt_answer_permitted_params)
    if @attempt.save
      render json: {notice: "Attempt has been saved sucessfully."}, status: :ok
    else
      render json: {error: @attempt.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def result
    render json: @attempt, status: :ok
  end

  private
  def set_quiz
    @quiz = Quiz.find_by(slug: params[:id].to_s.downcase)
    if @quiz.nil?
      render json: {notice: "Unable to find quiz."}, status: :unprocessable_entity
    end
  end
  
  def published_status
    if @quiz.status == :not_published
      render json: {notice: "Quiz is not published yet."}, status: :unprocessable_entity
    end
  end

  def standard_user_permitted_params
    params.require(:user).permit(:first_name, :last_name, :email).merge(role: :standard, password: 'welcome', password_confirmation: 'welcome')
  end

  def attempt_answer_permitted_params
    params.require(:attempt).permit(attempt_answers_attributes: [:option_id, :question_id]).merge(submitted: true)
  end

  def set_standard_user
    # creating user if not already present
    @standard_user = User.find_by_email(params[:user][:email])
    if @standard_user.nil?
      @standard_user = User.new(standard_user_permitted_params)
      if !@standard_user.save
        render json: {error: @standard_user.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end

  def set_attempt
    @attempt = Attempt.find_by(id: params[:id])
    if @attempt.nil?
      render json: {error: "Attempt id is not valid."}, status: :unprocessable_entity
    end
  end

  def attempt_check
    if @attempt.submitted
      render json: {error: "User has already attempted this quiz"}, status: :unprocessable_entity
    end
  end

  def validate_options
    if params[:attempt][:attempt_answers_attributes].length != @attempt.quiz.questions.length
      render json: {error: "Please select options of all questions."}, status: :unprocessable_entity
    end
  end
end
