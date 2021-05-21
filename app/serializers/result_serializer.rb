class ResultSerializer < ActiveModel::Serializer
  attributes :id, :name, :quiz_name, :correct, :incorrect, :email

  def quiz_name
    self.object.quiz.name
  end

  def name
    self.object.user.first_name + " " + self.object.user.last_name
  end

  def email
    self.object.user.email
  end
end
