class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  validate :validates_options
  validates :name, presence: true
  validates :options, presence: true
  validates :correct_option, presence: true, allow_blank: false
  
  private
  def validates_options
    if self.options.length > 4
      errors.add(:base, "Max 4 options can be added to a question.")
    elsif self.options.length < 2
      errors.add(:base, "Min 2 options are required to create a question")
    end
  end
end
