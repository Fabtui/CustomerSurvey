class Folder < ApplicationRecord
  has_many :days
  validates :name, presence: true
end
