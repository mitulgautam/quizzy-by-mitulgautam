class QuestionsController < ApplicationController
  before_action :set_quiz, only: [:create]
  before_action :set_question, only: [:update, :destroy]

  def create
    @question = @quiz.questions.build(permitted_params)
    if @question.save!
      render json: {question: @question, notice: "Question has been created successfully."}, status: :ok
    end
  end

  def destroy
    @question.destroy
    render json: { notice: "Question has been deleted." }, status: :ok
  end

  private
  def permitted_params
    params.require(:question).permit(:name, :correct_option, options_attributes: [:name])
  end

  def set_quiz
    @quiz = Quiz.find_by(id: params[:quiz_id])
    if @quiz.nil?
      render json: {notice: "Unable to find quiz with id #{params[:quiz_id]}"}, status: :unprocessable_entity
    end
  end

  def set_question
    @question = Question.find_by(id: params[:id])
    if @question.nil?
      render json: {notice: "Unable to find question with id #{params[:id]}"}, status: :unprocessable_entity
    end
  end
end
