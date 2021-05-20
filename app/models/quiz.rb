class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  validates :name, presence: true, length: {minimum: 10}
  validates :user_id, presence: true
  validates :slug, presence: true, uniqueness: true, if: :published?
  validates :status, presence: true
  enum status: [:unpublished, :published]
  before_validation :create_slug, if: :published?
  has_many :attempts, dependent: :destroy

  private
  def create_slug
    slug_name = ""
    count = Quiz.where("slug like :name", name: (parameterize_slug + "%")).count
    if count > 0
      slug_name = parameterize_slug.to_s + "-" + count.to_s
    else
      slug_name = parameterize_slug
    end
    self[:slug] = slug_name
  end

  def parameterize_slug
    name.parameterize.to_s
  end

  def published?
    self.status.to_sym == :published
  end
end
