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

var USER_NAME,
	URL = 'https://api.github.com/users/',
	REPO_NUM,
	FOLLOWER_NUM,
	FOLLOWING_NUM;

var init = function() {
	USER_NAME = configuration.username;
	REPO_NUM = configuration.repo_num;
	FOLLOWER_NUM = configuration.follower_num;
	FOLLOWING_NUM = configuration.following_num;
	URL += USER_NAME;

	bindEvent();
	Main.getUserInfo();
	Main.getRepoInfo();
	Main.getFollower();
	Main.getFollowing();
};

var bindEvent = function() {
	var ps = $('pluginSwitch').children,
		si = $('switchItems').children;

	function switchTab(i) {
		ps[i].onclick = function() {
			for(var p = 0; p < si.length; p++) {
				if(p == i) {
					ps[p].classList.add('current-tab');
					si[p].classList.toggle('current-item');
				} else {
					ps[p].classList.remove('current-tab');
					si[p].classList.remove('current-item');
				}
			}
		};
	}

	for(var i = 0; i < ps.length; i++) {
		switchTab(i);
	}
};

var Main = {
	getUserInfo: function() {
		Ajax.ajax({
			url: URL,
			callback: function(JSON) {
				$('userName').innerText = JSON.name;
				$('userAvatar').innerHTML = '<img class="logo" src="' + JSON.avatar_url + '">';
				$('userName').parentNode.href = JSON.html_url;
				$('userInfo').innerHTML = 'I am from ' + JSON.company +
							'<br>Blogged at <a href="' + JSON.blog + '">' + JSON.blog + '</a>' +
							'<br>This is my E-mail: <a href="' +
							'mailto:' + JSON.email + '">' + JSON.email + '</a>';
			}
		});
	},
	getRepoInfo: function() {
		Ajax.ajax({
			url: URL + '/repos',
			callback: function(JSON) {
				var tempNode;

				for(var i = 0; i < REPO_NUM; i++) {
					tempNode = document.createElement('li');
					tempNode.innerHTML = JSON[i].name;

					$('repos').appendChild(tempNode);
				}
			}
		});
	},
	getFollower: function() {
		Ajax.ajax({
			url: URL + '/followers',
			callback: function(JSON) {
				
			}
		});
	},
	getFollowing: function() {
		Ajax.ajax({
			url: URL + '/following',
			callback: function(JSON) {
				
			}
		});
	}
};

document.ready = init();