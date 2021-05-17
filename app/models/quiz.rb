class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  validates :name, presence: true, length: {minimum: 10}
  validates :user_id, presence: true
end
