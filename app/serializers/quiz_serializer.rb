class QuizSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :slug
end
