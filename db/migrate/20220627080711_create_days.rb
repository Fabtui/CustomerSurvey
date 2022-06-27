class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|
      t.date :date
      t.string :name
      t.integer :good
      t.integer :bad
      t.integer :total
      t.string :location

      t.timestamps
    end
  end
end
