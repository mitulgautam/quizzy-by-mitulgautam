class ReportsController < ApplicationController
  def index
    @result = Attempt.all
    render json: @result, each_serializer: ResultSerializer, status: :ok
  end
end
