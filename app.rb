# myapp.rb
require 'sinatra'
require 'httparty'
require 'json'


require 'sinatra/base'

class App < Sinatra::Base

get '/' do
  erb :index
end

get '/events' do
  response = HTTParty.get('https://api.meetup.com/Digitale-Initativen/events?photo-host=public&page=20&sig_id=8826366&sig=8ab18e6ab2055b866e5359fa12c12e50a969f748')
  content_type :json
  { events: response.parsed_response }.to_json
end

end
