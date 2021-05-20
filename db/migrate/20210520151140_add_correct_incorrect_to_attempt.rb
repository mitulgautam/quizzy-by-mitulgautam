class AddCorrectIncorrectToAttempt < ActiveRecord::Migration[6.0]
  def change
    add_column :attempts, :correct, :integer, default: 0, null: false
    add_column :attempts, :incorrect, :integer, default: 0, null: false
  end
end
