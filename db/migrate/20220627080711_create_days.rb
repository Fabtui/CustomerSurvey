class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|
      t.date :date
      t.string :name
      t.integer :good
      t.integer :bad
      t.integer :total
      t.string :location
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
