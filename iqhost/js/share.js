var Shares = {
	title: 'Поделиться',
	width: 800,
	height: 800,
	init: function() {
		var share = document.querySelectorAll('.social');
		for (var i = 0, l = share.length; i < l; i++) {
			var url = share[i].getAttribute('data-url') || location.href,
				title = share[i].getAttribute('data-title') || '',
				desc = share[i].getAttribute('data-desc') || '',
				el = share[i].querySelectorAll('a');
			for (var a = 0, al = el.length; a < al; a++) {
				var id = el[a].getAttribute('data-id');
				if (id) this.addEventListener(el[a], 'click', {
					id: id,
					url: url,
					title: title,
					desc: desc
				});
			}
		}
	},
	addEventListener: function(el, eventName, opt) {
		var _this = this,
			handler = function() {
				_this.share(opt.id, opt.url, opt.title, opt.desc);
			};
		if (el.addEventListener) {
			el.addEventListener(eventName, handler);
		} else {
			el.attachEvent('on' + eventName, function() {
				handler.call(el);
			});
		}
	},
	share: function(id, url, title, desc) {
		url = encodeURIComponent(url);
		desc = encodeURIComponent(desc);
		title = encodeURIComponent(title);
		switch (id) {
			case 'fb':
				this.popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + url, this.title, this.width, this.height);
				break;
			case 'vk':
				this.popupCenter('https://vk.com/share.php?url=' + url + '&description=' + title + '. ' + desc, this.title, this.width, this.height);
				break;				
			case 'in':
				this.popupCenter('https://www.instagram.com/direct/inbox/' + url, this.title, this.width, this.height);
				break;
			case 'twitter':
				this.popupCenter('https://twitter.com/share' + url, this.title, this.width, this.height);
				break;	
		}
	},
	newTab: function(url) {
		var win = window.open(url, '_blank');
		win.focus();
	},
	popupCenter: function(url, title, w, h) {
		var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 3) - (h / 3)) + dualScreenTop;
		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
		if (window.focus) {
			newWindow.focus();
		}
	}
};
jQuery(document).ready(function($) {
	$('.article-share a').on('click', function() {
		var id = $(this).data('id');
		if (id) {
			var data = $(this).parent('.article-share');
			var url = data.data('url') || location.href,
				title = data.data('title') || '',
				desc = data.data('desc') || '';
			Shares.share(id, url, title, desc);
		}
	});
});
