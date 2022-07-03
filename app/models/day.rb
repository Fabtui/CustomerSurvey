class Day < ApplicationRecord
  validates :name, :date, :location, presence: true
  belongs_to :user
end
