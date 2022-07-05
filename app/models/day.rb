class Day < ApplicationRecord
  validates :name, :date, :location, presence: true
  belongs_to :user
  belongs_to :folder, optional: true

  def day_label
    "#{self.date.strftime('%d/%m/%Y')} - #{self.name.capitalize}"
  end
end
