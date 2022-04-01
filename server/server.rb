require "stripe"
require "dotenv"
require "sinatra"

Dotenv.load
Stripe.api_key = ENV["STRIPE_SECRET_KEY"]


set :static, true
# set :public_folder, File.join(File.dirname(__FILE__), ENV["STATIC_DIR"])
set :port, 4242

# get "/" do 
#   content_type "text/html"
#   send_file File.join(settings.public_folder, "index.html")
# end

get "/public-keys" do 
  content_type "application/json"
  { key: ENV["STRIPE_PUBLIC_KEY"] }.to_json
end

# post "/my-post-route" do 
#   data = JSON.parse(request.body.read, symbolize_names: true)
#   puts data.to_json
#   data.to_json
# end

def calculate_order_amount(_items)
  total = _items.to_s.split(".").join.to_i
  # # Replace this constant with a calculation of the order's amount
  # # Calculate the order total on the server to prevent
  # # people from directly manipulating the amount on the client
  # 1400
  total
end

post '/create-payment-intent' do
  content_type 'application/json'
  data = JSON.parse(request.body.read)

  # Create a PaymentIntent with amount and currency
  payment_intent = Stripe::PaymentIntent.create(
    amount: calculate_order_amount(data['items']),
    currency: data["currency"],
    receipt_email: data["receipt_email"],
    automatic_payment_methods: {
      enabled: true,
    },
  )

  {
    clientSecret: payment_intent['client_secret']
  }.to_json
end

# post '/webhook' do
#   payload = request.body.read
#   event = nil

#   begin
#     event = Stripe::Event.construct_from(
#       JSON.parse(payload, symbolize_names: true)
#     )
#   rescue JSON::ParserError => e
#     # Invalid payload
#     puts "⚠️  Webhook error while parsing basic request. #{e.message})"
#     status 400
#     return
#   end
#   # Check if webhook signing is configured.
#   if endpoint_secret
#     # Retrieve the event by verifying the signature using the raw body and secret.
#     signature = request.env['HTTP_STRIPE_SIGNATURE'];
#     begin
#       event = Stripe::Webhook.construct_event(
#         payload, signature, endpoint_secret
#       )
#     rescue Stripe::SignatureVerificationError
#       puts "⚠️  Webhook signature verification failed. #{err.message})"
#       status 400
#     end
#   end

#   # Handle the event
#   case event.type
#   when 'payment_intent.succeeded'
#     payment_intent = event.data.object # contains a Stripe::PaymentIntent
#     puts "Payment for #{payment_intent['amount']} succeeded."
#     # Then define and call a method to handle the successful payment intent.
#     # handle_payment_intent_succeeded(payment_intent)
#   when 'payment_method.attached'
#     payment_method = event.data.object # contains a Stripe::PaymentMethod
#     # Then define and call a method to handle the successful attachment of a PaymentMethod.
#     # handle_payment_method_attached(payment_method)
#   else
#     puts "Unhandled event type: #{event.type}"
#   end
#   status 200
# end