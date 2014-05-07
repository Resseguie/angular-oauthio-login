# AngularJS service/directive for authenticating with OAuth.io services

Simple AngularJS service/directive pair for authenticating users using the OAuth.io service.

If you use Twitter, Facebook, or GitHub, the API call to populate the user object is done for you. If you use another provider, you need to use the returned endpoint to make the OAuth calls to the provider API yourself.

## Install
1. download the files
	1. Bower
		1. add `"angular-oauthio-login": "resseguie/angular-oauthio-login#latest"` to your `bower.json` file then run `bower install` OR run `bower install resseguie/angular-oauthio-login`
2. include the files in your app
	1. `oauthio-login.min.js`
3. include the module in angular (i.e. in `app.js`) - `resseguie.angular-oauthio-login`

## Dependencies
At a minimum, this module just depends on AngularJS, but the directive adds classes that support Bootstrap buttons with Font Awesome icons for each OAuth provider. If the provider name (in lowercase) matches the Font Awesome class name, the icon is added automatically.

## Documentation

Just add the following directive:

```html
	<div drr-oauthio-login
		data-oauth-user="oauthUser"
		data-oauth-provider="github"
		data-provider-icon="github-alt"  // optional
		data-oauthio-key="<your public OAuth.io key>">
	</div>
```

You can extract information from the oauthUser after successful authentication such as:

```html
<h1>Logged in as {{oauthUser.user.name}}</h1>
```

Our use oauthUser.endpoint to make manual OAuth calls to the provider API.
