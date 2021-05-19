module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user
    before_action :set_current_user
  end

  def set_current_user
    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
    end
  end

  def authenticate_user
    if session[:user_id].nil?
      render json: {error: "Unauthorised user."}, status: :unauthorized
    end
  end
end