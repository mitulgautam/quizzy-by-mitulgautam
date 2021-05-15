class Quiz < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: {minimum: 10}
  validates :user_id, presence: true

end
