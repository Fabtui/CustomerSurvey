class FoldersController < ApplicationController
  def show
    @folder = Folder.find(params[:id])
    @events = @folder.events
    @event = Event.new
    respond_to do |format|
      format.html
      format.xlsx {
        response.headers['Content-Disposition'] = 'attachment; filename="Evenements_CustomerSurvey.xlsx"'
      }
    end
  end

  def new
    @folder = Folder.new
    @events = Event.where(user_id: current_user.id).where(folder_id: nil).order(date: :desc)
  end

  def create
    @folder = Folder.new(folder_params)
    @folder.user_id = current_user.id
    if @folder.save
      params[:folder][:events].delete_if(&:empty?)
      unless params[:folder][:events].empty?
        params[:folder][:events].each do |event_id|
          event = Event.find(event_id.to_i)
          event.folder_id = @folder.id
          event.save
        end
      end
      redirect_to events_path, notice: "Nouveau dossier créé"
    else
      redirect_to events_path, alert: "Le nouveau dossier n'a pu être créé"
    end
  end

  def edit
    @folder = Folder.find(params[:id])
  end

  def update
    respond_to do |format|
      format.html {
        @folder = Folder.find(params[:id])
        @folder.update(folder_params)
        redirect_to folder_path(@folder.id), notice: "Le dossier a été édité"
      }
      format.json {
        @folder = Folder.find(params["id"])
        @event = Event.find(params["folder"]["id"])
        @event.folder_id = @folder.id
        @event.save
      }
    end

  end

  def destroy
    @folder = Folder.find(params[:id])
    @events = Event.where(folder_id: @folder.id)
    if params[:all] == "true"
      @events.destroy_all
      @folder.destroy
      redirect_to events_path, notice: "Le dossier et ses évènements ont été supprimé"
    else
      @events.each do |event|
        event.folder_id = nil
        event.save
      end
      @folder.destroy
      redirect_to events_path, notice: "Le dossier a été supprimé"
    end
  end


  private

  def folder_params
    params.require(:folder).permit(:name)
  end
end
