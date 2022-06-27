class Day < ApplicationRecord
  validates :name, :tag_line, :date, presence: true
end
