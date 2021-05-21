class ReportJob < ApplicationJob
  queue_as :default

  def perform()
    # Do something later
    Axlsx::Package.new do |p|
      p.workbook.add_worksheet(name: "Quiz Report") do |sheet|
        sheet.add_row ["Quiz Name", "User Name", "Email", "Correct Answer(s)", "Incorrect Answer(s)"]
        Attempt.all.each do |entry|
          quiz_name = entry.quiz.name
          user_name = entry.user.first_name + " " + entry.user.last_name
          email = entry.user.email
          correct = entry.correct
          incorrect = entry.incorrect
          sheet.add_row [quiz_name, user_name, email, correct, incorrect]
        end
      end
      p.serialize('public/report.xlsx')
    end
  end
end
