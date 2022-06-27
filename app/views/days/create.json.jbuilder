if @day.persisted?
  json.id(@day.id)
  json.name(@day.name)
  json.date(@day.date.strftime('%d/%m/%Y'))
  json.notice json.partial!("shared/new_confirm.html.erb")
else
  json.form json.call("pages/home.html.erb")
end
