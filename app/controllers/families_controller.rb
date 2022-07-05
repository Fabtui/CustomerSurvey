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

  def edit
    @family = Family.find(params[:id])
  end

  def update
    @family = Family.find(params[:id])
    @family.update(family_params)
    redirect_to family_path(@family.id), notice: "Le dossier a été édité"
  end

  def destroy
    @family = Family.find(params[:id])
    @days = Day.where(family_id: @family.id)
    @days.each do |day|
      day.family_id = nil
      day.save
    end
    @family.destroy
    redirect_to days_path
  end


  private

  def family_params
    params.require(:family).permit(:name)
  end
end
