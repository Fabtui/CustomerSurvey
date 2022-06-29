class AddMiddleToDays < ActiveRecord::Migration[6.1]
  def change
    add_column :days, :middle, :integer
  end
end
