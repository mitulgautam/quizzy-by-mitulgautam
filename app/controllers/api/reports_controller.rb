class Api::ReportsController < ApplicationController
  def index
    @result = Attempt.all
    render json: @result, each_serializer: ResultSerializer, status: :ok
  end

  def download
    ReportJob.perform_later
    sleep 3
    send_file File.join(Rails.root, 'public/report.xlsx'), :type=>"application/xlsx"
  end
end
