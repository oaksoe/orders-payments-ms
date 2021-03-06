# Apps flow
When orders service receives order/create api request, it
- creates order model, saves to mongodb,
- publish message 'orderCreated' to amqp message broker with order info and dummy auth token,
- orders orchestrator receives the message and publishes message 'processPayment' to amqp,
- payments service receives the message, mock-authenticates the dummy auth token, mock-validates the order info
- payments service mock-process the payment and publish either 'orderConfirmed' or 'orderCancelled' message to amqp
- orders orchestrator receives the message of 'orderConfirmed' and updates the order status in mongodb
- 3 seconds after 'confirmed' status update, it updates the order status to 'delivered'

# To run app
- In PC, install and run mongodb server and rabbitmq server
- In the project, do: 
    - yarn install
    - cd orders-app
    - node app.js
    - cd payments-app
    - node app.js
- Use Postman to test the apis
    - /order/create
    - /order/cancel
    - /order/status/:id
