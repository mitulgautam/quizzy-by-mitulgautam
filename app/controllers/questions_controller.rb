class QuestionsController < ApplicationController
  before_action :set_quiz

  def create
    @question = @quiz.questions.build(permitted_params)
    if @question.save!
      render json: {question: @question, notice: "Question has been created successfully."}, status: :ok
    end
  end

  private
  def permitted_params
    params.require(:question).permit(:name, :correct_option, options: [:name])
  end

  def set_quiz
    @quiz = Quiz.find_by(id: params[:quiz_id])
    if @quiz.nil?
      render json: {notice: "Unable to find quiz with quiz id #{params[:quiz_id]}"}, status: :unprocessable_entity
    end
  end
end
