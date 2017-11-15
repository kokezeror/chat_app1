Rails.application.routes.draw do

  get 'sessions/new'

namespace :api, { format: 'json' } do
  resources :messages
end

  resources :messages
  root to: 'messages#index'
end
