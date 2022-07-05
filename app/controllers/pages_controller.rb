class PagesController < ApplicationController
  def home
    @days = Day.where(user_id: current_user.id).order(date: :desc)
    @day = Day.new
    @selected_day = @days.where(selected: true)
    @folders = Folder.where(user_id: current_user.id)
  end
end
