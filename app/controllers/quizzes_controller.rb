class QuizzesController < ApplicationController

  def create
    @quiz = @current_user.quizzes.build(permitted_params)
    if @quiz.save
      render json: { notice: "Quiz added successfully." }, status: :ok
    else
      render json: { error: @quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def permitted_params
      params.require(:quiz).permit(:name)
    end

end
