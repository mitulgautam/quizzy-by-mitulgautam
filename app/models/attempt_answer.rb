class AttemptAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :option
  belongs_to :attempt
end
