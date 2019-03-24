# Apis
# Create Order
Url: http://localhost:8001/v1/api/order/create
Method: Post
Request Body: {
	"customerID": "CUST002",
	"details": {
		"hello": "hi"
	}
}
Response Data: {
    "status": "SUCCESS",
    "data": {
        "id": "0d8480e4-0016-4315-adb4-146dcf5274c3"
    }
}

# Cancel Order
Url: http://localhost:8001/v1/api/order/cancel
Method: Post
Request Body: {
	"id": "0d8480e4-0016-4315-adb4-146dcf5274c3"
}
Response Data: {
    "status": "SUCCESS",
    "data": {}
}

# Get Order Status
Url: http://localhost:8001/v1/api/order/status/0d8480e4-0016-4315-adb4-146dcf5274c3
Method: Get
Response Data: {
    "status": "SUCCESS",
    "data": {
        "status": "Cancelled"
    }
}
