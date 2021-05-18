class QuestionsController < ApplicationController
  before_action :set_quiz, only: [:create]
  before_action :set_question, only: [:update, :destroy, :show]

  def create
    @question = @quiz.questions.build(permitted_params)
    if @question.save
      render json: {question: @question, notice: "Question has been created successfully."}, status: :ok
    else
      render json: {error: @question.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @question.destroy
    render json: { notice: "Question has been deleted." }, status: :ok
  end

  def show
    render json: @question, status: :ok, serializer: QuestionSerializer
  end

  def update
      @question.name = params[:question][:name]
      @question.correct_option = params[:question][:correct_option]
      options = params[:question][:options_attributes]
      option_ids = [] # this will contains ids of already created options
      options.each do |option|
        if option[:id].to_s.count("a-zA-Z") > 0
          @question.options.build(name: option[:name])
        else
          option_ids << option[:id]
          option = @question.options.find_by(id: option[:id])
          option.update!(name: option[:name])
        end
      end
      # this will delete all the options which are removed
      @question.options.where(id: (@question.options.pluck(:id) - option_ids)).destroy_all
      if @question.save
        render json: {notice: "Question has been updated!"}, status: :ok
      else
        render json: {error: @question.errors.full_messages}, status: :unprocessable_entity
    end
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
