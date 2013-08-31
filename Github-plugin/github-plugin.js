var USER_NAME;
var URL = 'https://api.github.com/users/';

// Configure your github-plugin
var configuration = {
	// What's your name, guy?
	"username": 'SFantasy',
	// How much information you wanna show?
	"repo_num": '5',
	"follower_num": '5',
	"following_num": '5'
};

var $ = function(str) {
	return document.getElementById(str);
};

var init = function() {
	USER_NAME = configuration.username;
	bindEvent();
	Main.getUserInfo();
};

var bindEvent = function() {

};

var Main = {
	getUserInfo: function() {
		Ajax.ajax({
			type: 'GET',
			datatype: 'JSON',
			url: URL + USER_NAME,
			callback: function(JSON) {
				$('user-name').innerText = JSON.login;
				$('user-avatar').innerHTML = '<img src="' + JSON.avatar_url + '">';
			}
		});
	},
	getRepoInfo: function() {

	},
	getFollower: function() {

	},
	getFollowing: function() {

	}
};

document.ready = init();