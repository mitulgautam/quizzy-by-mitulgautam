class AddSlugToQuiz < ActiveRecord::Migration[6.0]
  def change
    add_column :quizzes, :slug, :string
    add_index :quizzes, :slug
  end
end
