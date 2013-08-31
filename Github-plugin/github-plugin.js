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

	function removeItems() {
		for(var t = 0; t < si.length; t++) {
			si[t].classList.remove('current-item');
		}
	}

	if(window.onscroll) {
		window.onscroll = removeItems;
	} else {
		document.onscroll = removeItems;
	}
};

// Sort repos default by watchers_count
var Sort = function(data) {
	return data.sort(function(a, b) {
		return a.watchers_count > b.watchers_count ? -1 : a.watchers_count == b.watchers_count ? 0 : 1;
	});
};

// Main function
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
				var tempNode, length;
				Sort(JSON);

				if(REPO_NUM < JSON.length) {
					length = REPO_NUM;
				} else {
					length = JSON.length;
				}

				for(var i = 0; i < length; i++) {
					tempNode = document.createElement('li');
					tempNode.innerHTML = '<a href="' + JSON[i].html_url + '">' + JSON[i].name +'</a>';

					$('repos').appendChild(tempNode);
				}
			}
		});
	},
	getFollower: function() {
		Ajax.ajax({
			url: URL + '/followers',
			callback: function(JSON) {
				var tempNode, length;

				if(FOLLOWER_NUM < JSON.length) {
					length = FOLLOWER_NUM;
				} else {
					length = JSON.length;
				}

				for(var i = 0; i < length; i++) {
					tempNode = document.createElement('li');
					tempNode.innerHTML = '<a href="' + JSON[i].html_url + '">' + JSON[i].login +'</a>';

					$('followers').appendChild(tempNode);
				}
			}
		});
	},
	getFollowing: function() {
		Ajax.ajax({
			url: URL + '/following',
			callback: function(JSON) {
				var tempNode, length;

				if(FOLLOWING_NUM < JSON.length) {
					length = FOLLOWING_NUM;
				} else {
					length = JSON.length;
				}

				for(var i = 0; i < length; i++) {
					tempNode = document.createElement('li');
					tempNode.innerHTML = '<a href="' + JSON[i].html_url + '">' + JSON[i].login +'</a>';

					$('followings').appendChild(tempNode);
				}
			}
		});
	}
};

document.ready = init();