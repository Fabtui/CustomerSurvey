class EventsController < ApplicationController
  def index
    @folders = Folder.where(user_id: current_user.id)
    @all_events = Event.where(user_id: current_user.id)
    @events = Event.where(user_id: current_user.id).where(folder_id: nil).order(date: :desc)
    @event = Event.new
    respond_to do |format|
      format.html
      format.xlsx {
        response.headers['Content-Disposition'] = 'attachment; filename="Evenements_CustomerSurvey.xlsx"'
      }
    end
  end

  def show
    @event = Event.find(params[:id])
    if @event.good.present?
      satisfaction = ((((@event.middle.to_f / 2) + (@event.good))*100).to_f / @event.total).round(2)
    end
    good_pc = ((@event.good * 100) / @event.total) * 2
    middle_pc = ((@event.middle * 100) / @event.total) * 2
    bad_pc = ((@event.bad * 100) / @event.total) * 2
    total = 200

    respond_to do |format|
      format.pdf do
        pdf = Prawn::Document.new
        # pdf.fill_color('0000ff')
        x = 100
        y = 50
        pdf.blend_mode(:Multiply) do
          pdf.fill_color('ff6b6b')
          pdf.fill_rectangle([x, bad_pc+y], 50, bad_pc)
        end
        pdf.blend_mode(:Multiply) do
          pdf.fill_color('f9f61d')
          pdf.fill_rectangle([x+100, middle_pc+y], 50, middle_pc)
        end
        pdf.blend_mode(:Multiply) do
          pdf.fill_color('0ecb43')
          pdf.fill_rectangle([x+200, good_pc+y], 50, good_pc)
        end
        pdf.blend_mode(:Multiply) do
          pdf.fill_rectangle([x+300, total+y], 50, total)
        end

        pdf.image "#{Rails.root}/app/assets/images/Customer.png", :at => [0,730], :width => 80, :height => 80
        pdf.text "Customer Satisfaction", size: 32, align: :center
        pdf.text "Survey", size: 32, align: :center
        pdf.text " "
        pdf.text " "
        pdf.text " "
        pdf.text " "
        pdf.text @event.name, size: 22
        pdf.text @event.date.strftime('%d/%m/%Y'), size: 16
        pdf.text @event.location, size: 16
        pdf.text " "
        pdf.text " "
        pdf.text " "
        pdf.text "Résultats :", size: 16
        pdf.text " "
        unless @event.total.zero?
          pdf.text "Mauvais: #{@event.bad}       (#{(@event.bad * 100) / @event.total} %)", size: 16
          pdf.text "Moyen: #{@event.middle}          (#{(@event.middle * 100) / @event.total} %)", size: 16
          pdf.text "Bon: #{@event.good}              (#{(@event.good * 100) / @event.total} %)", size: 16
          pdf.text "--------------------------------", size: 16
          pdf.text "Total: #{@event.total}", size: 16
          pdf.text " "
          pdf.text " "
          pdf.text "Taux de satisfaction: #{satisfaction} %", size: 20
        else
          pdf.text "Pas de donné pour cet évènement"
        end
        send_data pdf.render,
          filename: "CustomerSurvey #{@event.date.strftime('%d/%m/%Y')}.pdf",
          type: 'application/pdf',
          disposition: 'inline'
      end
    end
  end

  def new
    @event = Event.new
    @folders = Folder.where(user_id: current_user.id)
  end

  def create
    @event = Event.new(event_params)
    if params[:event][:folder].present?
      @event.folder_id = params[:event][:folder]
    end
    @event.user_id = current_user.id
    @event.good = 0
    @event.bad = 0
    @event.middle = 0
    @event.total = 0
    all_events_unselected
    @event.selected = true
    respond_to do |format|
      if @event.save
        if params[:event][:folder].present?
          format.html { redirect_to folder_path(params[:event][:folder]), notice: "Votre nouvel évènement a été créé" }
        else
          format.html { redirect_to request.referrer, notice: "Votre nouvel évènement a été créé" }
        end
        format.json # Follow the classic Rails flow and look for a create.json view
      else
        format.html { redirect_to request.referrer, alert: "Une erreur s'est produite, la nouvel évènement n'a pu être créé" }
        format.json # Follow the classic Rails flow and look for a create.json view
      end
    end
  end

  def edit
    @event = Event.find(params[:id])
    @folders = Folder.where(user_id: current_user.id)
  end

  def update
    @event = Event.find(params[:id])
    if params[:remove_folder].present?
      @folder = @event.folder
      @event.folder_id = nil
      if @event.save
        redirect_to folder_path(@folder.id), notice: "L'évènement a été retiré du dossier"
      end
    else
    @event.update(event_params)
      if params[:event][:folder].present?
        @folder = Folder.find(params[:event][:folder])
        @event.folder_id = @folder.id
        if @event.save
          redirect_to folder_path(@folder.id), notice: "L'évènement a été édité"
        else
          render :edit
        end
      elsif params[:event][:folder].empty? && @event.folder.present?
        @event.folder_id = nil
        if @event.save
          redirect_to events_path, notice: "L'évènement a été édité"
        else
          render :edit
        end
      else
        if @event.save
          if @event.folder
            redirect_to folder_path(@event.folder.id), notice: "L'évènement a été édité"
          else
            redirect_to events_path, notice: "L'évènement a été édité"
          end
        else
          render :edit
        end
      end
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    redirect_to request.referrer, notice: "L'évènement a été supprimé"
  end

  def save
    @event = Event.find(params[:id])
    if params[:replace] == 'true'
      @event.good = params[:good].to_i
      @event.middle = params[:middle].to_i
      @event.bad = params[:bad].to_i
      @event.total = params[:bad].to_i + params[:good].to_i + params[:middle].to_i
    else
      good = @event.good + params[:good].to_i
      bad = @event.bad + params[:bad].to_i
      middle = @event.middle + params[:middle].to_i
      @event.good = good
      @event.bad = bad
      @event.middle = middle
      @event.total = (good.to_i + bad.to_i + middle.to_i)
    end
    @event.save
  end

  def select
    @event = Event.find(params[:id])
    if @event.selected
      @event.selected = false
    else
      all_events_unselected
      @event.selected = true
    end
    @event.save
    redirect_to request.referrer
  end

  private

  def event_params
    params.require(:event).permit(:name, :location, :tag_line, :date, :folder_id)
  end

  def all_events_unselected
    Event.all.each do |event|
      event.selected = false
      event.save
    end
  end

end
