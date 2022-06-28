class Day < ApplicationRecord
  validates :name, :date, presence: true
  belongs_to :user
end
