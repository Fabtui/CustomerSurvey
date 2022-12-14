class Event < ApplicationRecord
  validates :name, :date, :location, presence: true
  belongs_to :user, dependent: :destroy
  belongs_to :folder, optional: true
  def event_label
    "#{self.date.strftime('%d/%m/%Y')} - #{self.name.capitalize}"
  end
end
