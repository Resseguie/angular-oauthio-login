# AngularJS service/directive for authenticating with OAuth.io services

Simple AngularJS service/directive pair for authenticating users using the OAuth.io service. Produces a simple button that handles all the OAuth.io calls for you and saves the resulting authenticated user object into your scope.

The saved user object includes the raw endpoint (for making your own manual calls to the provider API), the authenticated user object from the provider (where supported by OAuth.io me() endpoint), and/or any returned error message.


## Install
1. download the files
	1. Bower
		1. add `"angular-oauthio-login": "resseguie/angular-oauthio-login#latest"` to your `bower.json` file then run `bower install` OR run `bower install resseguie/angular-oauthio-login`
2. include the files in your app
	1. `oauthio-login.min.js`
3. include the module in angular (i.e. in `app.js`) - `resseguie.angular-oauthio-login`

## Dependencies
At a minimum, this module just depends on AngularJS and OAuth.io's oauth-js, but the directive adds classes that support Bootstrap buttons with Font Awesome icons for each OAuth provider. If the provider name (in lowercase) matches a Font Awesome class name, the icon is added automatically.

## Documentation

Just add the following directive:

```html
	<div drr-oauthio-login
		data-on-login="login(endpoint,user,provider,error)"
		data-oauth-provider="github"
		data-provider-icon="github-alt"  // optional
		data-oauthio-key="<your public OAuth.io key>">
	</div>
```

After login, the onLogin callback function will be called. You can extract information from the returned user object after successful authentication such as:

```html
<h1>Logged in as {{user.name}}</h1>
```

Use the returned endpoint object to make manual OAuth calls to the provider API.


## Testing

There is a sample application included for testing the directive and showing its usage. You'll just need to run it inside a web server or use something like 'python -m SimpleHTTPServer 8000'.
