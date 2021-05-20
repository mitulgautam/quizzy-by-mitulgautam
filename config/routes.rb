Rails.application.routes.draw do

  resources :sessions do
    collection do
      post "/login" => "sessions#create"
      get  "/logout" => "sessions#destroy"
      get  "/user" => "sessions#user"
    end
  end

  resources :quizzes
  resources :questions
  resources :reports

  namespace :api do
    resources :public do
      collection do
        post '/' => "public#create"
        put '/:id' => "public#update"
        get '/result/:id' => "public#result"
      end
    end
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
