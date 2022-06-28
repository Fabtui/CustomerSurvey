class DaysController < ApplicationController
  def index
    @days = Day.all.order(date: :desc)
    @day = Day.new
    respond_to do |format|
      format.html
      format.xlsx {
        response.headers['Content-Disposition'] = 'attachment; filename="Evenements_CustomerSurvey.xlsx"'
      }
    end
  end

  def show
  end

  def new
    @day = Day.new
  end

  def create
    @day = Day.new(day_params)
    @day.selected = false
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
    @day.good = params[:good].to_i
    @day.bad = params[:bad].to_i
    @day.total = params[:bad].to_i + params[:good].to_i
    @day.save
  end

  def select
    @day = Day.find(params[:id])
    if @day.selected
      @day.selected = false
    else
      Day.all.each do |day|
        day.selected = false
        day.save
      end
      @day.selected = true
    end
    @day.save
    redirect_to days_path
  end

  private

  def day_params
    params.require(:day).permit(:name, :location, :tag_line, :date)
  end
end
