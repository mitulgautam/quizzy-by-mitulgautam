class CreateAttempts < ActiveRecord::Migration[6.0]
  def change
    create_table :attempts do |t|
      t.references :user, null: false, foreign_key: true
      t.boolean :submitted
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
