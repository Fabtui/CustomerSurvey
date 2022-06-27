class AddSelectedToDay < ActiveRecord::Migration[6.1]
  def change
    add_column :days, :selected, :boolean
  end
end
