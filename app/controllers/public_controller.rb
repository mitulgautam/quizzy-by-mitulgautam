class PublicController < ApplicationController
  before_action :set_quiz
  before_action :published_status
  def show
    render json: @quiz, serializer: QuizQuestionSerializer, status: :ok
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
end
