Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :days
  resources :families
  get '/days/:id/save', to: 'days#save', as: 'day_save'
  post '/days/:id/select', to: 'days#select', as: 'day_select'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
