angular.module('Mediamath')
.factory('mmFactory', function($http, $q) {
	var resource = {};
	var api_token = "2bb29790b391b2b36594df3b32acc8d0aa4270e7";

	resource.getAgencies = function () {
		return $http.get("http://challenge.mediamath.com/api/agencies?api_token="+api_token)
		.then(function(response){
			return response;
		}, function(error) {
			console.log(error);
		});
		
	}

	resource.getAdvertisers = function(agencyId) {
		return $http.get("http://challenge.mediamath.com/api/advertisers?api_token="+api_token+"&agency_id="+agencyId)
		.then(function(response){
			return response;
		}, function(error) {
			console.log(error);
		});
		
	}

	resource.getCampaigns = function(advertiserId) {
		return $http.get("http://challenge.mediamath.com/api/campaigns?api_token="+api_token+"&advertiser_id="+advertiserId)
		.then(function(response){
			return response;
		}, function(error) {
			console.log(error);
		});
	}

	resource.postCampaigns = function(campaignData) {
		var values = [];
		for (var i=0; i < campaignData.length; i++) {
  		var data = {
  			"name": campaignData[i]["name"],
  			"budget": typeof campaignData[i]["budget"] === "string" ? parseInt(campaignData[i]["budget"].slice(1)) : campaignData[i]["budget"],
  			"start_date": typeof campaignData[i]["start_date"] === "string" ? campaignData[i]["start_date"] : campaignData[i]["start_date"].toISOString(),
  			"end_date": typeof campaignData[i]["end_date"] === "string" ? campaignData[i]["end_date"] : campaignData[i]["end_date"].toISOString(),
  			"status": campaignData[i]["status"]
  		};
  		console.log(data);
  		var promise = $http.post("http://challenge.mediamath.com/api/campaigns/"+campaignData[i]["_id"]+"?api_token="+api_token, data)
  		values.push(promise);
  	}
  	return $q.all(values).then(function(response) {
  		return response;
  	}, function(error) {
  		console.log(error);
  	});
	}

	return resource;
});