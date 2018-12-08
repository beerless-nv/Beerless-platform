# API Documentation
This api is used by the front-end app, located in this repo.

## Endpoints
This APi features a number of resources:
* beers
* breweries
* users
* beertypes
* articles
* tags
* articletags

## basic requests
A list of all rows of a resource can be gotten by a simple get request:
```
GET /beers

returns: {
    success: true|false,
    beers: [
        {beerObj},
        {beerObj},
        ...
    ]
}
```

An insert can be done on the base resource as well, via a post request:
```
POST /beers

requires: {
    "ipnutObject": {
        "name":"fooName",
        ...
    }
}

returns: {
    success: true,
    beer: {beerObj}
}
```

Getting a specific row by id is also done with a get request:
```
GET /beers/beerId

returns: {
    success: true,
    beer: {beerObj}
}
```

Deleting a specific row basen on id is done via a delete request:
```
DELETE /beers/beerId

returns: {
    success: true
}
```

Updating a row is also done based on the id via a patch request:
```
PATCH /beers/beerId

requires: {
    "updateArray": [
        {
            "propName": "name",
            "value": "Mooiere bieren"
        }
    ]
}

returns: {
    success: true
}
```

### Search
This endpoint is available on every endpoint under the url '/search' and should be accompagnied by a body which specifies on which fields to filter.
```
GET /beer/search

requires: {
    "searchParams": [
        {
            "propName": "name",
            "value": "vl",
            "operator": "like"
        }
    ]
}
```
You can add multiple fields to the array to filter even further. In the operator field you can use any SQL operator such as '>', '<', '>=', ... .

## Other functionalities
There are some more things that can be added to the request to customize them. Some are gicen through URL queries, others just over the body.

### Joining tables
This is done through a URL query. By adding the parameter 'joinTables' you say which ones are included. If there are multiple, they have to be seperated by a single comma:

```
GET /beers?joinTables=beertype,brewery
```

### Ordering results
This also achieved through a query parameter. It's not possible to sort on multiple fields. To sort you include the field and which way it should be seperated: ascending(asc) or descending(desc) seperated by a point:

```
GET /beers?orderBy=IBU.desc
```

### Limit and offset
To limit a result, just use it as qeury parameter in the URL, this should always be a number greater than 0.
```
GET /beers?limit=5
```
The same goes for offset, although this one can only be used in combination with limit:
```
GET /beers?offset=5
```
These query paramerts can only be used on the following resources:
* beers
* beertypes
* breweries
* users
* articles
* tags

## Additional info
Make sure you send the following headers along with the request:
```
Content-Type : application/json
X-Request-With : XMLHttpRequest
```