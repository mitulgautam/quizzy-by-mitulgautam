require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  resources :sessions do
    collection do
      post "/login" => "sessions#create"
      get  "/logout" => "sessions#destroy"
      get  "/user" => "sessions#user"
    end
  end

  resources :quizzes
  resources :questions
  

  namespace :api do
    resources :public do
      collection do
        post '/' => "public#create"
        put '/:id' => "public#update"
        get '/result/:id' => "public#result"
      end
    end
    resources :reports do
      collection do
        get '/download' => "reports#download"
      end
    end
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
