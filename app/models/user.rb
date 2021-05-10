class User < ApplicationRecord
  validates_presence_of :email, :first_name, :last_name
  validates_length_of :first_name, minimum: 3, maximum: 50
  validates_length_of :last_name, minimum: 3, maximum: 50
end
