class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :name, :correct_option
  has_many :options
end
