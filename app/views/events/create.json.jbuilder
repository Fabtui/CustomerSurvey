if @event.persisted?
  json.id(@event.id)
  json.name(@event.name)
  json.date(@event.date.strftime('%d/%m/%Y'))
  json.notice json.partial!("shared/new_confirm.html.erb")
else
  json.form json.call("pages/home.html.erb")
end
