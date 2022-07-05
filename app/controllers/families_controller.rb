class FamiliesController < ApplicationController
  def show
    @family = Family.find(params[:id])
    @days = @family.days
    @day = Day.new
  end

  def new
    @family = Family.new
    @days = Day.all
  end

  def create
    @family = Family.new(family_params)
    if @family.save
      if params[:family][:days].present?
        day = Day.find(params[:family][:days])
        day.family_id = @family.id
        day.save
      end
      redirect_to days_path, notice: "Nouveau dossier créé"
    else
      redirect_to days_path, alert: "Le nouveau dossier n'a pu être créé"
    end
  end

  private

  def family_params
    params.require(:family).permit(:name)
  end
end
