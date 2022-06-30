class DaysController < ApplicationController
  def index
    @days = Day.where(user_id: current_user.id).order(date: :desc)
    @day = Day.new
    respond_to do |format|
      format.html
      format.xlsx {
        response.headers['Content-Disposition'] = 'attachment; filename="Evenements_CustomerSurvey.xlsx"'
      }
    end
  end

  def show
    @day = Day.find(params[:id])
    if @day.good.present?
      satisfaction = ((((@day.middle.to_f / 2) + (@day.good))*100).to_f / @day.total).round(2)
    end
    respond_to do |format|
      format.pdf do
        pdf = Prawn::Document.new
        pdf.text "Customer Satisfaction Survey", size: 32, align: :center
        pdf.text " "
        pdf.text " "
        pdf.text " "
        pdf.text " "
        pdf.text @day.name, size: 22
        pdf.text @day.date.strftime('%d/%m/%Y'), size: 16
        pdf.text @day.location, size: 16
        pdf.text " "
        pdf.text " "
        pdf.text "Résultats :", size: 16
        pdf.text " "
        if @day.good.present?
          pdf.text "Mauvais: #{@day.bad}       (#{(@day.bad * 100) / @day.total} %)", size: 16
          pdf.text "Moyen: #{@day.middle}          (#{(@day.middle * 100) / @day.total} %)", size: 16
          pdf.text "Bon: #{@day.good}              (#{(@day.good * 100) / @day.total} %)", size: 16
          pdf.text "--------------------------------", size: 16
          pdf.text "Total: #{@day.total}", size: 16
          pdf.text " "
          pdf.text " "
          pdf.text "Taux de satisfaction: #{satisfaction} %", size: 20
        else
          pdf.text "Pas de donné pour cet évènement"
        end
        send_data pdf.render,
          filename: "CustomerSurvey #{@day.date.strftime('%d/%m/%Y')}.pdf",
          type: 'application/pdf',
          disposition: 'inline'
      end
    end
  end

  def new
    @day = Day.new
  end

  def create
    @day = Day.new(day_params)
    @day.user_id = current_user.id
    @day.good = 0
    @day.bad = 0
    @day.middle = 0
    @day.total = 0
    all_days_unselected
    @day.selected = true
    respond_to do |format|
      if @day.save
        format.html { redirect_to days_path, notice: "Votre nouvel évènement a été créé" }
        format.json # Follow the classic Rails flow and look for a create.json view
      else
        format.html { redirect_to days_path, alert: "Une erreur s'est produite, la nouvel évènement n'a pu être créé" }
        format.json # Follow the classic Rails flow and look for a create.json view
      end
    end
  end

  def edit
    @day = Day.find(params[:id])
  end

  def update
    @day = Day.find(params[:id])
    @day.update(day_params)
    redirect_to days_path, notice: "Votre évènement a été édité"

    # @day = Day.new
    # puts "---------------------"
    # puts params
    # respond_to do |format|
    #   if @day.save
    #     format.html { redirect_to days_path }
    #     format.json # Follow the classic Rails flow and look for a create.json view
    #     raise
    #   else
    #     format.html { redirect_to :root, alert: "Une erreur c'est produite, la création n'a pu aboutir" }
    #     format.json # Follow the classic Rails flow and look for a create.json view
    #   end
    # end
  end

  def destroy
    @day = Day.find(params[:id])
    @day.destroy
    redirect_to days_path
  end

  def save
    @day = Day.find(params[:id])
    if params[:replace] == 'true'
      @day.good = params[:good].to_i
      @day.middle = params[:middle].to_i
      @day.bad = params[:bad].to_i
      @day.total = params[:bad].to_i + params[:good].to_i + params[:middle].to_i
    else
      good = @day.good + params[:good].to_i
      bad = @day.bad + params[:bad].to_i
      middle = @day.middle + params[:middle].to_i
      @day.good = good
      @day.bad = bad
      @day.middle = middle
      @day.total = (good.to_i + bad.to_i + middle.to_i)
    end
    @day.save
  end

  def select
    @day = Day.find(params[:id])
    if @day.selected
      @day.selected = false
    else
      all_days_unselected
      @day.selected = true
    end
    @day.save
    redirect_to days_path
  end

  private

  def day_params
    params.require(:day).permit(:name, :location, :tag_line, :date)
  end

  def all_days_unselected
    Day.all.each do |day|
      day.selected = false
      day.save
    end
  end

end
