class AttemptSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :quiz, serializer: QuizQuestionSerializer
  has_many :attempt_answers
end
