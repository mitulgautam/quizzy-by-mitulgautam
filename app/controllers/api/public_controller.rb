class Api::PublicController < ApplicationController
  before_action :set_quiz
  before_action :published_status
  before_action :set_standard_user, only: [:create_attempt]

  def show
    render json: @quiz, serializer: QuizQuestionSerializer, status: :ok
  end

  def create_attempt
    @attempt = Attempt.new(quiz: @quiz, user: @standard_user)
    if @attempt.save
      render json: {notice: "Attempt has been created sucessfully."}, status: :ok
    else
      render json: {error: @attempt.errors.full_messages}, status: :unprocessable_entity
    end
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
end
