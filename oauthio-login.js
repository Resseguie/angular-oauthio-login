/**
@fileOverview

@toc

*/

'use strict';

angular.module('resseguie.angular-oauthio-login', [])
.factory('drrOauthioLogin', [ '$q', function ($q) {

	var providerAPI = {
		'twitter' : '/1.1/account/verify_credentials.json',
		'facebook': '/me'
	};

	//public methods & properties
	var self ={
		initialize : function(key){
			OAuth.initialize(key);
		},
		login : function(provider){
			var deferred = $q.defer();

			OAuth.popup(provider, function(err, res){
				if(err) {
					deferred.reject(err);
				}else{
					var api = providerAPI[provider];
					if(!api){
						deferred.reject('Unsupported OAuth provider. Xurrently supported: '+providerAPI.keys().join(','));
					}
					res.get(api)
						.then(function(data){
							deferred.resolve(data);
						});
					
				}
			});
			return deferred.promise;
		},
		validProvider: function(provider){
			var valid = providerAPI.hasOwnProperty(provider);
			return valid;
		}
	};
	
	//private methods and properties - should ONLY expose methods and properties publicly
	//(via the 'return' object) that are supposed to be used; everything else (helper methods
	//that aren't supposed to be called externally) should be private.
	
	return self;
}])
.directive('drrOauthioLogin',
	['drrOauthioLogin', function(oauthioLogin){
		return {
			restrict : "EA",
			template : '<div class="oauthio-login">'+
							'<button ng-show="validProvider(oauthProvider)" class="btn btn-xs btn-primary" ng-click="login()">'+
								'<div  ng-show="oauthProvider==\'twitter\'"><img src="https://oauth.io/api/providers/twitter/logo" /> Connect with Twitter</div>'+
								'<div  ng-show="oauthProvider==\'facebook\'"><img src="https://oauth.io/api/providers/facebook/logo" /> Connect with Facebook</div>'+
							'</button>'+
						'</div>',
			scope : {
				oauthUser     : "=", // model to store the results
				oauthError    : "=", // model to store any error messages
				oauthioKey    : "@", // OAuthi.io public key
				oauthProvider : "@"  // currently only supports 'twitter'
			},
			link: function(scope,element,attrs){
				scope.validProvider = function(provider){
					return oauthioLogin.validProvider(provider);
				};

				scope.login = function(){
					if(scope.oauthioKey){
						oauthioLogin.initialize(scope.oauthioKey);
					
						var promise = oauthioLogin.login(scope.oauthProvider);
						promise.then(function(user){
								scope.oauthUser  = user;
								scope.oauthError = null;
							},function(error){
								console.log(error);
								scope.oauthUser  = null;
								scope.oauthError = error.message;
							});
					}
				};
			}
		};
	}]
);
