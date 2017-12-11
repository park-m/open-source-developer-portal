---
layout: twoColumn
section: Customer verification
type: article
title:  "Handling verification statuses"
weight: 2
description: "How to handle customer verification statuses before sending a bank transfer with Dwolla's ACH API."
---

# Handling verification statuses

After successfully creating either a personal or business identity-verified `Customer`, they will immediately be given a status. There are various reasons a Customer status can be something other than `verified`; you will want to account for this after the Customer is created.

A Customer’s verification status is determined by an identity verification score based on the data submitted; this score is returned from Dwolla’s identity vendor. Therefore, it is important that the user enters accurate and complete identifying data, and that you exercise [best practices](https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet) in input field validation to ensure the best possible success rate. As an example, the `retry` status can occur when an individual (personal) or authorized representative (business) mis-keys or uses incorrect identifying information upon Customer creation (i.e. submitting a date of birth that differs from the user’s actual date of birth).

It is recommended to have an active webhook subscription to listen for Customer verification related events. Reference the table below for Customer verification statuses and the related events.

### Verification statuses

| Customer status | Event | Description |
|-----------------|-------|-------------|
| verified | customer_verified | The identifying information submitted was sufficient in verifying the Customer account. |
| retry | customer\_reverification\_needed | The initial identity verification attempt failed because the information provided did not satisfy Dwolla’s verification check. You can make one additional attempt by changing some or all the attributes of the existing Customer with a POST request. All fields are required on the retry attempt. If the additional attempt fails, the resulting status will be either `document` or `suspended`. |
| document | customer\_verification\_document\_needed | Dwolla requires additional documentation to identify the Customer in the document status. Once a document is uploaded it will be reviewed for verification. |
| suspended | customer_suspended | The Customer is suspended and may neither send nor receive funds. Contact Account Management for more information. |

### Testing verification statuses in Sandbox:

Dwolla’s Sandbox environment allows you to submit `verified`, `retry`, `document`, or `suspended` as the value of the firstName parameter to create a new verified Customer with their respective status. To simulate transitioning a verified Customer with a `retry` status to `verified`, you’ll need to call the [Update a Customer](https://docsv2.dwolla.com/#update-a-customer) endpoint and submit full identifying information with an updated firstName value and full SSN. To simulate transitioning a verified Customer with a `document` status to `verified` in the Sandbox, you’ll need to upload a test document as outlined in the [Testing in the Sandbox](https://developers.dwolla.com/resources/testing.html#simulate-document-upload-approved-and-failed-events) resource article.

## Handling status: `retry`

A `retry` status occurs when a Customer’s identity scores are too low during the initial verification attempt. Dwolla will require the **full 9-digits** of the individual (personal) or authorized representative (business) SSN on the retry attempt in order to give our identity vendor more information in an attempt to receive a sufficient score to approve the Customer account. The Customer will have one more opportunity to correct any mistakes. **Please note:** you need to gather **new** information if the Customer is placed into the `retry` status; simply passing the same information will result in the same insufficient scores. All fields that were required in the initial Customer creation attempt will be required in the retry attempt, along with the full 9-digit SSN.


```raw
POST https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St.",
  "address2": "Fl 8",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "ssn ": "202-99-1516"
}
```

```ruby
# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer_url = 'https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1'
request_body = {
      "firstName" => "John",
       "lastName" => "Doe",
          "email" => "jdoe@nomail.com",
      "ipAddress" => "10.10.10.10",
           "type" => "personal",
       "address1" => "221 Corrected Address St..",
       "address2" => "Apt 201",
           "city" => "San Francisco",
          "state" => "CA",
     "postalCode" => "94104",
    "dateOfBirth" => "1970-07-11",
            "ssn" => "123-45-6789"
}

customer = app_token.post customer_url, request_body
customer.id # => "132681fa-1b4d-4181-8ff2-619ca46235b1"
```

```javascript
// Using dwolla-v2 - https://github.com/Dwolla/dwolla-v2-node
var customerUrl = 'https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1';
var requestBody = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@dwolla.com",
  ipAddress: "10.10.10.10",
  type: "personal",
  address1: "221 Corrected Address St..",
  address2: "Fl 8",
  city: "Ridgewood",
  state: "NY",
  postalCode: "11385",
  dateOfBirth: "1990-07-11",
  ssn: "202-99-1516"
};

appToken
  .post(customerUrl, requestBody)
  .then(function(res) {
    res.body.id; // => '132681fa-1b4d-4181-8ff2-619ca46235b1'
  });
```

```python
# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer_url = 'https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1'
request_body = {
  "firstName": "John",
  "lastName": "Doe",
  "email": "jdoe@nomail.com",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St..",
  "address2": "Apt 201",
  "city": "San Francisco",
  "state": "CA",
  "postalCode": "94104",
  "dateOfBirth": "1970-07-11",
  "ssn": "123-45-6789"
}

customer = app_token.post('customers', request_body)
customer.body.id # => '132681fa-1b4d-4181-8ff2-619ca46235b1'
```

```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retryCustomer = $customersApi->create(array (
  'firstName' => 'John',
  'lastName' => 'Doe',
  'email' => 'johndoe@nomail.net',
  'ipAddress' => '10.10.10.10',
  'type' => 'personal',
  'address1' => '221 Corrected Address St.',
  'address2' => 'Fl 8',
  'city' => 'Ridgewood',
  'state' => 'NY',
  'postalCode' => '11385',
  'dateOfBirth' => '1990-07-11',
  'ssn' => '202-99-1516',
));

print($retryCustomer); # => 132681fa-1b4d-4181-8ff2-619ca46235b1
?>
```

Check the Customer’s status again. The Customer will either be in the `verified`, `document`, or `suspended` state of verification.

## Handling status: `document`

If the Customer has a status of `document`, the Customer will need to upload additional pieces of information in order to verify the account. The types of documents that are required will vary depending on if the user is created as a `personal` vs. `business` `verified Customer`. Use the [create a document](https://docsv2.dwolla.com/#create-a-document) endpoint when uploading a colored scan of the identifying document. The document(s) will then be reviewed by Dwolla; this review may take up to 1-2 business days to approve or reject.

### Document types

##### Individuals or Authorized Representatives

A scanned photo of the Customer's identifying document can be specified as documentType: `passport`, `license` (state issued driver's license), or `idCard` (other U.S. government-issued photo id card).

##### Businesses

Documents that are used to help identify a business are specified as documentType `other`. Business Identifying documents can include the following:

* Partnership, General Partnership: EIN Letter (IRS-issued SS4 confirmation letter).
* Limited Liability Corporation (LLC), Corporation: EIN Letter (IRS-issued SS4 confirmation letter).
* Sole Proprietorship: One or more of the following, as applicable to your sole proprietorship: Fictitious Business Name Statement; EIN documentation (IRS-issued SS4 confirmation letter); Color copy of a valid government-issued photo ID (e.g., a driver’s license, passport, or state ID card).

### Determining verification documents needed

When a Customer is placed in the `document` verification status, Dwolla will return a link in the API response after [retrieving a Customer](https://docsv2.dwolla.com/#retrieve-a-customer) which will be used by an application to determine if documentation is needed. For business `verified Customers`, different links can be returned depending on whether or not documents are needed for an authorized representative, the business, or both the authorized representative and business. Refer to the table below for the list of possible links and their description.

| Link name | Description |
|---------------|----------|
| verify-with-document | Identifies if documents are needed only for an individual or authorized representative. |
| verify-business-with-document | Identifies if documents are needed only for a business. |
| verify-authorized-representative-and-business-with-document | Identifies if documents are needed for both the individual and business. |

##### Example response

```noselect
{
    "_links": {
        "document-form": {

            "href": "https://api-sandbox.dwolla.com/customers/64dd2beb-fe56-4cdc-80dd-82a3d7f5b921/documents",
            "type": "application/vnd.dwolla.v1.hal+json; profile=\"https://github.com/dwolla/hal-forms\"",
            "resource-type": "document"
        },
        "self": {
            "href": "https://api-sandbox.dwolla.com/customers/64dd2beb-fe56-4cdc-80dd-82a3d7f5b921",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "customer"
        },
        "funding-sources": {
            "href": "https://api-sandbox.dwolla.com/customers/64dd2beb-fe56-4cdc-80dd-82a3d7f5b921/funding-sources",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "funding-source"
        },
        "transfers": {
            "href": "https://api-sandbox.dwolla.com/customers/64dd2beb-fe56-4cdc-80dd-82a3d7f5b921/transfers",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "transfer"
        },
        "verify-with-document": {
            "href": "https://api-sandbox.dwolla.com/customers/64dd2beb-fe56-4cdc-80dd-82a3d7f5b921/documents",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "document"
        }
    },
    "id": "64dd2beb-fe56-4cdc-80dd-82a3d7f5b921",
    "firstName": "document",
    "lastName": "doctest",
    "email": "docTest@email.com",
    "type": "personal",
    "status": "document",
    "created": "2017-08-31T14:28:11.047Z",
    "address1": "99-99 33rd St",
    "address2": "Apt 8",
    "city": "Some City",
    "state": "NY",
    "postalCode": "11101"
}
```

### Uploading a document

To upload a photo of the document, you’ll initiate a multipart form-data POST request from your backend server to `https://api.dwolla.com/customers/{id}/documents`. The file must be either a .jpg, .jpeg, .png, .tif, or .pdf. Files must be no larger than 10MB in size.

```raw
curl -X POST
\ -H "Authorization: Bearer tJlyMNW6e3QVbzHjeJ9JvAPsRglFjwnba4NdfCzsYJm7XbckcR"
\ -H "Accept: application/vnd.dwolla.v1.hal+json"
\ -H "Cache-Control: no-cache"
\ -H "Content-Type: multipart/form-data"
\ -F "documentType=passport"
\ -F "file=@foo.png"
\ 'https://api-sandbox.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1/documents'

HTTP/1.1 201 Created
Location: https://api-sandbox.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
```

```ruby
# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby
customer_url = 'https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1'

file = Faraday::UploadIO.new('mclovin.jpg', 'image/jpeg')
document = app_token.post "#{customer_url}/documents", file: file, documentType: 'license'
document.response_headers[:location] # => "https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0"
```

```javascript
// Using dwolla-v2 - https://github.com/Dwolla/dwolla-v2-node
var customerUrl = 'https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1';

var requestBody = new FormData();
body.append('file', fs.createReadStream('mclovin.jpg'), {
  filename: 'mclovin.jpg',
  contentType: 'image/jpeg',
  knownLength: fs.statSync('mclovin.jpg').size
});
body.append('documentType', 'license');

appToken
  .post(`${customerUrl}/documents`, requestBody)
  .then(function(res) {
    res.headers.get('location'); // => "https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0"
  });
```

```python
# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer_url = 'https://api.dwolla.com/customers/132681fa-1b4d-4181-8ff2-619ca46235b1'

document = app_token.post('%s/documents' % customer_url, file = open('mclovin.jpg', 'rb'), documentType = 'license')
document.headers['location'] # => 'https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0'
```

```php
// No SDK support. Coming soon
```

If the document was successfully uploaded, the response will be a HTTP 201 Created with the URL of the new document resource contained in the Location header.

```noselect
HTTP/1.1 201 Created
Location: https://api-sandbox.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
```

You’ll also get a webhook with a `customer_verification_document_uploaded` event to let you know the document was successfully uploaded.

### Document review process

Once created, the document will be reviewed by Dwolla. When our team has made a decision, which may take up to 1-2 business days to approve or reject, we’ll create either a `customer_verification_document_approved` or `customer_verification_document_failed` event.

If the document was sufficient, the Customer may be verified in this process. If not, we may need additional documentation. Note: Reference the [determining verification documents needed](/resources/customer-verification/handling-verification-statuses.html#determining-verification-documents-needed) section for more information on determining if additional documents are needed after an approved or failed event is triggered.

If the document was found to be fraudulent or doesn’t match the identity of the Customer, the Customer will be suspended.

### Document failure

A document can fail if, for example, the Customer uploaded the wrong type of document or the `.jpg` or `.png` file supplied was not readable (i.e. blurry, not well lit, or cuts off a portion of the identifying image). If you receive a `customer_verification_document_failed` webhook, you’ll need to upload another document. To retrieve the failure reason for the document upload, you’ll retrieve the document by its ID. Contained in the response will be a `failureReason` which corresponds to one of the following values:

* `ScanNotReadable` - The photo was blurry, parts of the image were cut off, or the photo had glares on it preventing information from being read
* `ScanNotUploaded` - A photo was uploaded, but it was not an ID
* `ScanIdTypeNotSupported` - An ID was uploaded, but it is not a form of ID we accept
* `ScanNameMismatch` - The name on the ID does not match the name on the account

##### Request and response

```raw
GET https://api-sandbox.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer tJlyMNW6e3QVbzHjeJ9JvAPsRglFjwnba4NdfCzsYJm7XbckcR

...

{
  "_links": {
    "self": {
      "href": "https://api-sandbox.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0"
    }
  },
  "id": "11fe0bab-39bd-42ee-bb39-275afcc050d0",
  "status": "reviewed",
  "type": "license",
  "created": "2016-01-29T21:22:22.000Z",
  "failureReason": "ScanNotReadable"
}
```

```ruby
# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
document_url = 'https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0'

document = app_token.get document_url
document.failureReason # => "ScanNotReadable"
```

```javascript
var documentUrl = 'https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0';

appToken
  .get(document_url)
  .then(function(res) {
    res.body.failureReason; // => "ScanNotReadable"
  });
```

```python
# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
document_url = 'https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0'

documents = app_token.get(document_url)
documents.body['failureReason'] # => 'ScanNotReadable'
```

```php
<?php
$aDocument = 'https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0';

$documentsApi = DwollaSwagger\DocumentsApi($apiClient);

$retrieved = $documentsApi->getCustomer($aDocument);
print($retrieved->failureReason); # => "ScanNotReadable"
?>
```

## Handling status: suspended

If the Customer is `suspended`, there’s no further action you can take to correct this using the API. You’ll need to contact support@dwolla.com or your account manager for assistance.

***

View
* [Personal verified Customers](/resources/customer-verification/personal-verified-customers.html) creation and verification.
* [Business verified Customer](/resources/customer-verification/business-verified-customers.html) creation and verification.
