class QuizQuestionSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :slug
  has_many :questions
end
