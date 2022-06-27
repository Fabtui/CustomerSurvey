class PagesController < ApplicationController
  def home
    @days = Day.all
    @day = Day.new
    @selected_day = Day.where(selected: true)
  end
end
