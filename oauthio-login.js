/**
@fileOverview

@toc

*/

'use strict';

angular.module('resseguie.angular-oauthio-login', [])
.factory('drrOauthioLogin', [ '$q', function ($q) {

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
					res.me(['name','alias','email','bio','avatar'])
						.done(function(data){
							result.user = data;
							deferred.resolve(result);
						});
				}
			});
			return deferred.promise;
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
								'<i class="fa fa-{{providerIcon | lowercase}}" style="margin-right: 5px;"></i> Connect with {{oauthProvider}}'+
							'</button>'+
						'</div>',
			scope : {
				onLogin       : "&", // callback function
				oauthioKey    : "@", // OAuthi.io public key
				oauthProvider : "@", // OAuth provider to authenticate with
				providerIcon  : "@"  // optional Font Awesome icon name to use
			},
			link: function(scope,element,attrs){
				// Default to fa-{{oauthProvider}} if no icon specified
				attrs.$observe('providerIcon',function(value){
					if(!value){ scope.providerIcon = scope.oauthProvider.toLowerCase();}
				});

				scope.login = function(){
					if(scope.oauthioKey){
						oauthioLogin.initialize(scope.oauthioKey);
				
						var promise = oauthioLogin.login(scope.oauthProvider);
						promise.then(function(result){
							var oauthUser = {};
							oauthUser.endpoint = result.endpoint;
							oauthUser.user     = result.user;
							oauthUser.provider = scope.oauthProvider;
							oauthUser.error    = null;
							scope.onLogin(oauthUser);
						},function(error){
							var oauthUser = {};
							oauthUser.endpoint = null;
							oauthUser.user     = null;
							oauthUser.error    = error;
							oauthUser.provider = scope.oauthProvider;
							scope.oauthUser    = oauthUser;
							scope.onLogin(oauthUser);
						});
					}
				};
			}
		};
	}]
);
