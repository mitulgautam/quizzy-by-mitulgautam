Rails.application.routes.draw do

  resources :sessions do
    collection do
      post "/login" => "sessions#create"
      get  "/logout" => "sessions#destroy"
      get  "/user" => "sessions#current_user"
    end
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
