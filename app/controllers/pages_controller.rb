class PagesController < ApplicationController
  def home
    @events = Event.where(user_id: current_user.id).order(date: :desc)
    @event = Event.new
    @selected_event = @events.where(selected: true)
    @folders = Folder.where(user_id: current_user.id)
  end
end
