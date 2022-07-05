class FamiliesController < ApplicationController
  def new
    @family = Family.new
    @days = Day.all
  end

  def create
    @family = Family.new(family_params)
    if @family.save
      day = Day.find(params[:family][:days])
      day.family_id = @family.id
      day.save
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
