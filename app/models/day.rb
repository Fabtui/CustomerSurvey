class Day < ApplicationRecord
  validates :name, :date, presence: true
end
