class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :name, :correct_option, :options
  # has_many :options

  def options
    self.object.options
  end
end
