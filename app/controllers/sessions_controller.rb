class SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:new, :create]

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {user: user, notice: "User logged in sucessfully."}, status: :ok
    else
      render json: {error: ["Invalid email/password. Please check and try again!"]}, status: :unauthorized
    end
  end

  def user
    if @current_user.present?
      render json: @current_user, status: :ok, serializer: UserSerializer
    else
      render json: {errors: ["No user logged in."], notice: "Unauthorised"}, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete(:user_id)
    @current_user = nil
    render json: {"notice": "User logged out successfully."}, status: :ok
  end
end