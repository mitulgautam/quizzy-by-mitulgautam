class SessionsController < ApplicationController
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

  def current_user
    if @current_user
      render json: @current_user, status: :ok
    else
      render json: {errors: ["No user logged in."], notice: "Unauthorised"}, status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    render json: {"notice": "User logged out successfully."}, status: :ok
  end
end