class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :name, null: false
      t.references :quiz, null: false, foreign_key: true
      t.integer :correct_option, null: false

      t.timestamps
    end
  end
end
