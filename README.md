# AngularJS service/directive for authenticating with OAuth.io services

Simple AngularJS service/directive pair for authenticating users using the OAuth.io service.

Currently only supports Twitter and Facebook login.

## Install
1. download the files
	1. Bower
		1. add `"resseguie/angular-oauthio-login": "latest"` to your `bower.json` file then run `bower install` OR run `bower install resseguie/angular-oauthio-login`
2. include the files in your app
	1. `oauthio-login.min.js`
3. include the module in angular (i.e. in `app.js`) - `resseguie.angular-oauthio-login`

## Dependencies
At a minimum, this module just depends on AngularJS, but the directive adds classes that support Bootstrap buttons.

## Documentation

Just add the following directive:

```html
	<div drr-oauthio-login
		data-oauth-user="oauthUser"
		data-oauth-error="authError"
		data-oauth-provider="twitter"
		data-oauthio-key="<your public OAuth.io key>">
	</div>
```

Where oauthUser is where the authenticated user will be saved. oauthProvider specifies the OAuth provider to use (e.g. 'facebook' or 'twitter'), and authError is where any error messages will be saved.

You can extract information from the oauthUser after successful authentication such as:

```html
<h1 ng-show="oauthProvider=='twitter'">Logged in as {{oauthUser.screen_name}}</h1>
<h1 ng-show="oauthProvider=='facebook'">Logged in as {{oauthUser.name}}</h1>
```

