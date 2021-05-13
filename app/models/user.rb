class User < ApplicationRecord
  has_secure_password
  validates_presence_of :email, :first_name, :last_name, :role, :password, :password_confirmation
  validates_length_of :first_name, minimum: 3, maximum: 50
  validates_length_of :last_name, minimum: 3, maximum: 50
  validates_uniqueness_of :email, :case_sensitive => false
  validates :email, email: {mode: :strict, require_fqdn: true}
  validates :password, confirmation: true, length: { minimum: 6 }
  validates :password_confirmation, on: :create, length: { minimum: 6 }
  before_save :downcase_email

  private
    def downcase_email
      self.email.downcase!
    end

  enum role: [:standard, :administrator]
  has_many :quizzes
end
