angular.module('Mediamath')
.controller('HomeController', function($scope, $http, mmFactory) {

	$scope.showModal = false;
	$scope.showModalError = false;
  $scope.showBool = false;
  

  mmFactory.getAgencies().then(function(agencies) {
  	$scope.agencies = agencies.data.agencies;
  });

  $scope.getAdvertisers = function(agencyId) {
  	mmFactory.getAdvertisers(agencyId).then(function(advertisers) {
  		$scope.advertisers = advertisers.data.advertisers;
  	});
  };

  $scope.getCampaigns = function(advertiserId) {
  	mmFactory.getCampaigns(advertiserId).then(function(campaigns) {
  		for (var i=0; i < campaigns.data.campaigns.length; i++) {
  			campaigns.data.campaigns[i]["value"] = false;
  		}
      $scope.showBool = !campaigns.data.campaigns.length ? false : true;
  		$scope.campaigns = campaigns.data.campaigns;
  	});
  };

  $scope.postCampaigns = function(campaigns) {
  	var campaign_post_data = [];
  	for (var i=0; i < campaigns.length; i++) {
  		if (campaigns[i]["value"]) {
  			campaign_post_data.push(campaigns[i]);
  		}
  	}

  	if (!campaign_post_data || !campaign_post_data.length) {
	  	$scope.showModalError = !$scope.showModalError;
  	} else {
  		mmFactory.postCampaigns(campaign_post_data).then(function(resp) {
	  		if (resp[0].status === 200) {
	  			$scope.showModal = !$scope.showModal;
	  		} else {
	  			$scope.showModalError = !$scope.showModalError;
	  		}
	  	});
  	}

  };

  $scope.boolToStr = function(arg) {return JSON.parse(arg) ? 'true' : 'false'};


});