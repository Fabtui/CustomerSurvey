class PagesController < ApplicationController
  def home
    @days = Day.all
    @day = Day.new
  end
end
