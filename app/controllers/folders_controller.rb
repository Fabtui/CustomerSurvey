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
    @days = Day.where(user_id: current_user.id).where(folder_id: nil).order(date: :desc)
  end

  def create
    @folder = Folder.new(folder_params)
    @folder.user_id = current_user.id
    if @folder.save
      params[:folder][:days].delete_if(&:empty?)
      unless params[:folder][:days].empty?
        params[:folder][:days].each do |day_id|
          day = Day.find(day_id.to_i)
          day.folder_id = @folder.id
          day.save
        end
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
    if params[:all] == "true"
      @days.destroy_all
      @folder.destroy
      redirect_to days_path, notice: "Le dossier et ses évènements ont été supprimé"
    else
      @days.each do |day|
        day.folder_id = nil
        day.save
      end
      @folder.destroy
      redirect_to days_path, notice: "Le dossier a été supprimé"
    end
  end


  private

  def folder_params
    params.require(:folder).permit(:name)
  end
end
