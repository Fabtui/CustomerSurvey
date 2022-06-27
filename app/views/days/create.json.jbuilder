if @day.persisted?
  json.form json.partial!("shared/save_confirm.html.erb")
  json.inserted_item json.call("pages/home.html.erb")
else
  json.form json.call("pages/home.html.erb")
end
