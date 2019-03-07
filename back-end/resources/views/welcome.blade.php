<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Beerless API</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <link rel="icon" href="https://www.assets.beerless.be/assets/images/favicon/favicon.ico">

    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            padding: 2rem;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links > a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .m-b-md {
            margin-bottom: 30px;
        }

        pre {
            background-color: #f5f5f5;
            padding: 1.5rem;
            border-radius: 0.25rem;
        }

        article {
            border: 1px solid #dddddd;
            border-radius: 0.25rem;
            padding: 2rem;
            margin-bottom: 5rem;
        }

        a {
            text-decoration: none;
            color: #f9b054;
            font-weight: bold;
        }
    </style>
</head>
<body>
<div>
    <article>
        <h1><a id="user-content-api-documentation" class="anchor" aria-hidden="true" href="#api-documentation">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>API Documentation
        </h1>
        <p><strong>API URL:</strong> <a href="https://www.api.beerless.be/api">https://www.api.beerless.be/api</a></p>
        {{--<p>This api is used by the front-end app, located in this repo.</p>--}}
        <h2><a id="user-content-endpoints" class="anchor" aria-hidden="true" href="#endpoints">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Endpoints
        </h2>
        <p>This API features a number of resources:</p>
        <ul>
            <li>beers</li>
            <li>breweries</li>
            <li>users</li>
            <li>beertypes</li>
            <li>articles</li>
            <li>tags</li>
            <li>articletags</li>
        </ul>
        <h2><a id="user-content-basic-requests" class="anchor" aria-hidden="true" href="#basic-requests">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>basic requests
        </h2>
        <p>A list of all rows of a resource can be requested by a simple get request:</p>
        <pre><code>GET /beers

returns: {
    success: true|false,
    beers: [
        {beerObj},
        {beerObj},
        ...
    ]
}
</code></pre>
        <p>An insert can be done on the base resource as well, via a post request:</p>
        <pre><code>POST /beers

requires: {
    "inputObject": {
        "name":"fooName",
        ...
    }
}

returns: {
    success: true,
    beer: {beerObj}
}
</code></pre>
        <p>Getting a specific row by id is also done with a get request:</p>
        <pre><code>GET /beers/beerId

returns: {
    success: true,
    beer: {beerObj}
}
</code></pre>
        <p>Deleting a specific row based on id is done via a delete request:</p>
        <pre><code>DELETE /beers/beerId

returns: {
    success: true
}
</code></pre>
        <p>Updating a row is also done based on the id via a patch request:</p>
        <pre><code>PATCH /beers/beerId

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
</code></pre>
        <h3><a id="user-content-search" class="anchor" aria-hidden="true" href="#search">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Search
        </h3>
        <p>This endpoint is available on every endpoint via the url '/search' and should be accompanied by a body
            which specifies on which fields to filter.</p>
        <pre><code>GET /beer/search

requires: {
    "searchParams": [
        {
            "propName": "name",
            "value": "vl",
            "operator": "like"
        }
    ]
}
</code></pre>
        <p>You can add multiple fields to the array to filter even further. In the operator field you can use any SQL
            operator such as '&gt;', '&lt;', '&gt;=', ... .</p>
        <h2><a id="user-content-other-functionalities" class="anchor" aria-hidden="true" href="#other-functionalities">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Other functionalities
        </h2>
        <p>There are some more things that can be added to the request to customize them. Some are given through URL
            queries, others just over the body.</p>
        <h3><a id="user-content-get-a-specific-value-from-a-row" class="anchor" aria-hidden="true"
               href="#get-a-specific-value-from-a-row">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Get a specific value(s) from a row
        </h3>
        <p>If you'd like to get a specific value(s) from a specific row in a table, you can achieve this by using a query
            parameter. Add the parameter 'value' and specify which value(s) you want to get from the database:</p>
        <p>Works only with beers and breweries at this moment.</p>
        <pre><code>GET /beers/beerId?value=name,ABV
</code></pre>
        <h3><a id="user-content-joining-tables" class="anchor" aria-hidden="true" href="#joining-tables">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Joining tables
        </h3>
        <p>This is done through a URL query. By adding the parameter 'joinTables' you say which ones are included. If
            there are multiple parameters, they have to be separated by a single comma:</p>
        <pre><code>GET /beers?joinTables=beertype,brewery
</code></pre>
        <h3><a id="user-content-ordering-results" class="anchor" aria-hidden="true" href="#ordering-results">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Ordering results
        </h3>
        <p>This also achieved through a query parameter. It's not possible to sort on multiple fields. To sort you
            include the field and which way it should be separated: ascending(asc) or descending(desc) separated by a
            point:</p>
        <pre><code>GET /beers?orderBy=IBU.desc
</code></pre>
        <h3><a id="user-content-limit-and-offset" class="anchor" aria-hidden="true" href="#limit-and-offset">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Limit and offset
        </h3>
        <p>To limit a result, just use it as query parameter in the URL, this should always be a number greater than
            0.</p>
        <pre><code>GET /beers?limit=5
</code></pre>
        <p>The same goes for offset, although this one can only be used in combination with limit:</p>
        <pre><code>GET /beers?offset=5
</code></pre>
        <p>These query parameters can only be used on the following resources:</p>
        <ul>
            <li>beers</li>
            <li>beertypes</li>
            <li>breweries</li>
            <li>users</li>
            <li>articles</li>
            <li>tags</li>
        </ul>
        <h2><a id="user-content-additional-info" class="anchor" aria-hidden="true" href="#additional-info">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
            </a>Additional info
        </h2>
        <p>Make sure you send the following headers along with the request:</p>
        <pre><code>Content-Type : application/json
X-Request-With : XMLHttpRequest</code></pre>
    </article>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
    var apiRoot = 'https://api.github.com';
    var myUser = 'Tomnuyts1';
    var myRepo = 'Beerless-platform';
    var request = new XMLHttpRequest();
    request.open('GET', apiRoot + '/repos/' + myUser + '/' + myRepo + '/readme');
    request.setRequestHeader('Accept', 'application/vnd.github.v3.html');
    /* add event listeners... */
    request.onreadystatechange = function () {
        console.log(request);
        if (request.readyState === 4 && request.status === 200) {
            // document.body.innerHTML = request.response;
            alert('hey');
            alert(request.response);
        }
    };
    request.send();
</script>
</body>
</html>
