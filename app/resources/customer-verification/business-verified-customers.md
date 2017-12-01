---
layout: twoColumn
section: Customer verification
type: article
title:  "Business verified Customers"
weight: 1
description: "How to verify a business customer before sending a bank transfer with Dwolla's ACH API."
---

# Business verified Customer

## Create a business verified Customer

To create a business verified Customer, use the [Create a Customer](https://docsv2.dwolla.com/#create-a-customer) endpoint. A business verified Customer is determined by setting the value of the `type` request parameter to `business` and including additional field required for identifying the business, as well as the authorized representative of the business.

## Events

As a developer, you can expect these events to be triggered when a business verified Customer is successfully created and systematically verified:

1. `customer_created`
2. `customer_verified`

## Required parameters - business verified Customer

| Parameter | Required | Type | Description |
|----------------|-------------|---------|----------------|
| firstName | yes | string | Authorized representative’s legal first name. |
| lastName | yes | string | Authorized representative’s legal last name. |
| email | yes | string | Authorized representative or business email address. |
| type | yes | string | Type of identity verified Customer. Value of `business` for business. |
| address1 | yes | string | Street number, street name of business’ physical address. |
| address2 | no | string | Apartment, floor, suite, bldg # of business’ physical address. |
| city | yes | string | City of business’ physical address. |
| state | yes | string | Two-letter US state or territory abbreviation code of business’ physical address. |
| postalCode | yes | string | Business’ US five-digit ZIP or ZIP + 4 code. |
| dateOfBirth | yes | string | Authorized representative’s date of birth. Must be 18 years of age with format of `YYYY-MM-DD`. |
| ssn | yes | string | Last four-digits of authorized representative’s social security number. |
| businessClassification | yes | string | The industry classification id that corresponds to Customer’s business |
| businessType | yes | string | Business structure. Possible values are corporation, llc, partnership, and soleproprietorship |
| businessName | yes | string | Registered business name |
| ein | yes | Employer Identification Number. Note: If the businessType is `soleproprietorship` then ein can be omitted from the request. |

Once you submit this request, Dwolla will perform some initial validation to check for formatting issues such as an invalid date of birth, invalid email format, etc. If successful, the response will be a HTTP 201/Created with the URL of the new Customer resource contained in the Location header.

### Request and response

```raw
POST https://api-sandbox.dwolla.com/customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
  "firstName": "Jane",
  "lastName": "Merchant",
  "email": "janeMerchant@email.com",
  "ipAddress": "127.0.0.1",
  "type": "business",
  "address1": "99-99 33rd St",
  "city": "Some city",
  "state": "NY",
  "postalCode": "11101",
  "dateOfBirth": "1970-01-01",
  "ssn": "1234",
  "businessClassification": "9ed38155-7d6f-11e3-83c3-5404a6144203",
  "businessType": "llc",
  "businessName":"Jane Corp",
  "ein":"12-3456789"
}

HTTP/1.1 201 Created
Location: https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```

```ruby
request_body = {
  :firstName => 'Jane',
  :lastName => 'Merchant',
  :email => 'janeMerchant@email.com',
  :type => 'business',
  :address1 => '99-99 33rd St',
  :city => 'Some City',
  :state => 'NY',
  :postalCode => '11101',
  :dateOfBirth => '1970-01-01',
  :ssn => '1234',
  :businessClassification => '9ed38155-7d6f-11e3-83c3-5404a6144203',
  :businessType => 'llc',
  :businessName => 'Jane Corp',
  :ein => '12-3456789',
}
# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer = app_token.post "customers", request_body
customer.response_headers[:location] # => "https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C"
```

```javascript
var requestBody = {
  firstName: 'Jane',
  lastName: 'Merchant',
  email: 'janeMerchant@email.com',
  type: 'business',
  address1: '99-99 33rd St',
  city: 'Some City',
  state: 'NY',
  postalCode: '11101',
  dateOfBirth: '1970-01-01',
  ssn: '1234',
  businessClassification: '9ed38155-7d6f-11e3-83c3-5404a6144203',
  businessType: 'llc',
  businessName: 'Jane Corp',
  ein: '12-3456789'
};

appToken
  .post('customers', requestBody)
  .then(res => res.headers.get('location')); // => 'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'
```

```python
request_body = {
  'firstName': 'Jane',
  'lastName': 'Merchant',
  'email': 'janeMerchant@email.com',
  'type': 'business',
  'address1': '99-99 33rd St',
  'city': 'Some City',
  'state': 'NY',
  'postalCode': '11101',
  'dateOfBirth': '1970-01-01',
  'ssn': '1234',
  'businessClassification': '9ed38155-7d6f-11e3-83c3-5404a6144203',
  'businessType': 'llc',
  'businessName': 'Jane Corp',
  'ein': '12-3456789'
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = app_token.post('customers', request_body)
customer.headers['location'] # => 'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'
```

```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Jane',
  'lastName' => 'Merchant',
  'email' => 'janeMerchant@email.com',
  'type' => 'business',
  'address1' => '99-99 33rd St',
  'city' => 'Some City',
  'state' => 'NY',
  'postalCode' => '11101',
  'dateOfBirth' => '1970-01-01',
  'ssn' => '1234',
  'businessClassification' => '9ed38155-7d6f-11e3-83c3-5404a6144203',
  'businessType' => 'llc',
  'businessName' => 'Jane Corp',
  'ein' => '12-3456789'
]);

print($new_customer); # => https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
?>
```

## Check the status of the business Customer

Businesses may need to provide additional information to help verify their identity. It is important to immediately check the status of the business Customer to determine if additional documentation is needed.

Let’s check to see if the Customer was successfully verified or not. We are going to use the location of the Customer resource that we just created, which is in `new_customer`.

Request:

```raw
GET https://api-sandbox.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C"
    }
  },
  "id": "AB443D36-3757-44C1-A1B4-29727FB3111C",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@nomail.com",
  "type": "unverified",
  "status": "unverified",
  "created": "2015-09-03T23:56:10.023Z"
}
```

```ruby
customer_url = 'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer = app_token.get customer_url
customer.firstName # => "Jane"
```

```php
<?php
$customerUrl = 'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C';

$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$customer = $customersApi->getCustomer($customerUrl);
$customer->firstName; # => "Jane"
?>
```

```python
customer_url = 'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = app_token.get(customer_url)
customer.body['firstName']

```

```javascript
var customerUrl = 'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C';

appToken
  .get(customerUrl)
  .then(res => res.body.firstName); // => 'Jane'
```

## Next steps

Our Customer has been created successfully, but it has a verification status of “document”.

Note that while `document` status is not a deal-breaking issue which prevents a business from being eligible to open an account, Dwolla will request for additional information about the entity. As a developer, in order for your users to provide this additional information, you will want to build a way for Customers to upload verification documents. Continue reading for instructions on [handling Customer verification statuses](https://developers.dwolla.com/resources/customer-verification/handling-verification-statuses.html) and guidelines for providing additional information to verify this type of Customer.

***

View
* [Personal verified Customers](/resources/customer-verification/personal-verified-customers.html) creation and verification
* [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html) for Business verified Customers.
