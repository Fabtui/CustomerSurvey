Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :events
  resources :folders
  get '/events/:id/save', to: 'events#save', as: 'event_save'
  post '/events/:id/select', to: 'events#select', as: 'event_select'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
