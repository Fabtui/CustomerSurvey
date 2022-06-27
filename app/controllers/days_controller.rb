class DaysController < ApplicationController
  def index
    @days = Day.all
    @day = Day.new
  end

  def show
  end

  def new
    @day = Day.new
  end

  def create
    @day = Day.new(day_params)
    if @day.save
      redirect_to days_path
    else
      redirect_to :root, alert: "Une erreur c'est produite, la création n'a pu aboutir"
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def day_params
    params.require(:day).permit(:name, :location, :tag_line, :date)
  end
end
