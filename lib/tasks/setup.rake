desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

def create_sample_data!
  create_user! email: "sam@example.com"
end

def create_user!(options = {})
  user_attributes = { password: "welcome",
                      password_confirmation: "welcome",
                      first_name: "Sam",
                      last_name: "Smith",
                      role: "administrator" }
  attributes = user_attributes.merge options
  User.create! attributes
end