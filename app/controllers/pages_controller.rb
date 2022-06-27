class PagesController < ApplicationController
  def home
    @days = Day.all
  end
end
