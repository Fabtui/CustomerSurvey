class FoldersController < ApplicationController
  def show
    @folder = Folder.find(params[:id])
    @days = @folder.days
    @day = Day.new
    respond_to do |format|
      format.html
      format.xlsx {
        response.headers['Content-Disposition'] = 'attachment; filename="Evenements_CustomerSurvey.xlsx"'
      }
    end
  end

  def new
    @folder = Folder.new
    @days = Day.all
  end

  def create
    @folder = Folder.new(folder_params)
    if @folder.save
      if params[:folder][:days].present?
        day = Day.find(params[:folder][:days])
        day.folder_id = @folder.id
        day.save
      end
      redirect_to days_path, notice: "Nouveau dossier créé"
    else
      redirect_to days_path, alert: "Le nouveau dossier n'a pu être créé"
    end
  end

  def edit
    @folder = Folder.find(params[:id])
  end

  def update
    @folder = Folder.find(params[:id])
    @folder.update(folder_params)
    redirect_to folder_path(@folder.id), notice: "Le dossier a été édité"
  end

  def destroy
    @folder = Folder.find(params[:id])
    @days = Day.where(folder_id: @folder.id)
    @days.each do |day|
      day.folder_id = nil
      day.save
    end
    @folder.destroy
    redirect_to days_path
  end


  private

  def folder_params
    params.require(:folder).permit(:name)
  end
end
