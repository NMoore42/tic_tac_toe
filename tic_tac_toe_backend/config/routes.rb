Rails.application.routes.draw do
  Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :players
        resources :games
        get '/winner', to: 'games#winner', as: 'winner'
        get '/stats', to: 'games#stats', as: 'stats'
      end
    end
  end
end
