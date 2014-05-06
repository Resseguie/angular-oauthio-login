/**
@fileOverview

@toc

*/

'use strict';

angular.module('resseguie.angular-oauthio-login', [])
.factory('drrOauthioLogin', [ '$q', function ($q) {

	var providerAPI = {
		'twitter' : '/1.1/account/verify_credentials.json',
		'facebook': '/me',
		'github'  : '/user'
	};

	//public methods & properties
	var self ={
		initialize : function(key){
			OAuth.initialize(key);
		},
		login : function(provider){
			provider = provider.toLowerCase();

			var deferred = $q.defer();

			OAuth.popup(provider, function(err, res){
				if(err) {
					deferred.reject(err);
				}else{
					var result = {};
					result.endpoint = res;

					var api = providerAPI[provider];
					if(!api){
						deferred.resolve(result);
					}else{
						res.get(api)
							.then(function(data){
								result.user = data;
								deferred.resolve(result);
							});						
					}
					
				}
			});
			return deferred.promise;
		},
		knownProvider: function(provider){
			var valid = providerAPI.hasOwnProperty(provider.toLowerCase());
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
							'<button class="btn btn-s btn-primary" ng-click="login()">'+
								'<i class="fa fa-{{oauthProvider | lowercase}}" style="margin-right: 5px;"></i> Connect with {{oauthProvider}}'+
							'</button>'+
						'</div>',
			scope : {
				oauthUser     : "=", // model to store the results
				oauthioKey    : "@", // OAuthi.io public key
				oauthProvider : "@"
			},
			link: function(scope,element,attrs){
				scope.knownProvider = function(provider){
					return oauthioLogin.knownProvider(provider);
				};

				scope.login = function(){
					if(scope.oauthioKey){
						oauthioLogin.initialize(scope.oauthioKey);
				
						var promise = oauthioLogin.login(scope.oauthProvider);
						promise.then(function(result){
							var oauthUser = {};
							oauthUser.endpoint = result.endpoint;
							oauthUser.user     = result.user;
							oauthUser.error    = null;
							scope.oauthUser    = oauthUser;
						},function(error){
							var oauthUser = {};
							oauthUser.endpoint = null;
							oauthUser.user     = null;
							oauthUser.error    = error;
							scope.oauthUser    = oauthUser;
						});
					}
				};
			}
		};
	}]
);
