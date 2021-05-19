class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:update, :destroy, :show]

  def create
    @quiz = @current_user.quizzes.build(permitted_params)
    if @quiz.save
      render json: { notice: "Quiz added successfully." }, status: :ok
    else
      render json: { error: @quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @quizzes = @current_user.quizzes
    render json: @quizzes, status: :ok, each_serializer: QuizSerializer
  end

  def show
    render json: @quiz, status: :ok, serializer: QuizQuestionSerializer
  end

  def destroy
      @quiz.destroy
      @quizzes = @current_user.quizzes.select(:id, :name)
      render json: {quizzes: @quizzes, notice: "Quiz has been deleted sucessfully"}, status: :ok
  end

  def update
    @quiz.update(permitted_params)
    render json: {notice: "Quiz has been updated sucessfully"}, status: :ok
  end

  private
    def permitted_params
      params.require(:quiz).permit(:name, :status)
    end

    def set_quiz
      @quiz = Quiz.find_by(id: params[:id])
      if @quiz.nil?
        render json: {error: "Quiz id is not valid."}, status: :unprocessable_entity
      end
    end
end
