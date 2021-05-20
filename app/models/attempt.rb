class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :attempt_answers, allow_destroy: true
  validates :quiz, presence: true
  validates :user, presence: true
end
