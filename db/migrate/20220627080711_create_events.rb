class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.date :date
      t.string :name
      t.integer :good
      t.integer :middle
      t.integer :bad
      t.integer :total
      t.boolean :selected
      t.string :tag_line
      t.string :location
      t.references :folder, null: true, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
