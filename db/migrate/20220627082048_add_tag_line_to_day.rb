class AddTagLineToDay < ActiveRecord::Migration[6.1]
  def change
    add_column :days, :tag_line, :string
  end
end
