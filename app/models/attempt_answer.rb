class AttemptAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :option
  belongs_to :attempt
  validates :question, presence: true
  validates :option, presence: true
  validates :attempt, presence: true
  validates_uniqueness_of :attempt, scope: [:question_id]
end
