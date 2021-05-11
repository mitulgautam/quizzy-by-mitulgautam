Rails.application.routes.draw do

  post "/log-in", to: "sessions#create"
  get  "/logout", to: "sessions#destroy"
  get  "/user", to: "sessions#current_user"

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
