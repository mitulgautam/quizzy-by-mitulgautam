class AddPublishedStatusToQuiz < ActiveRecord::Migration[6.0]
  def change
    add_column :quizzes, :status, :integer, default: 0, null: false
  end
end
