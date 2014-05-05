# AngularJS service/directive for authenticating with OAuth.io services

Simple AngularJS service/directive pair for authenticating users using the OAuth.io services.

Currently only supports Twitter and Facebook login.

## Demo
http://resseguie.github.io/angular-oauthio-login/

## Dependencies
- required:
	oauth-js (OAuth.io Javascript library)
- optional
	bootstrap (Used by default for styling, but you can use custom styles if desired)

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"angular-oauthio-login": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-oauthio-login`
2. include the files in your app
	1. `oauthio-login.min.js`
3. include the module in angular (i.e. in `app.js`) - `resseguie.angular-oauthio-login`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `oauthio-login.js` file top comments for usage examples and documentation
https://github.com/resseguie/angular-oauthio-login/blob/master/oauthio-login.js
