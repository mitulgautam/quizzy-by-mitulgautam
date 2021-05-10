class User < ApplicationRecord
  validates_presence_of :email, :first_name, :last_name
  validates_length_of :first_name, minimum: 3, maximum: 50
  validates_length_of :last_name, minimum: 3, maximum: 50
  validates_uniqueness_of :email, :case_sensitive => false
  validates :email, email: {mode: :strict, require_fqdn: true}
  before_save :downcase_email

  def downcase_email
    self.email.downcase!
  end

  enum role: [:standard, :administrator]
end
