(function(window, undefined) {

	var jQuery = function(selector) {
		return new jQuery.fn.init(selector);
	}
	jQuery.fn = jQuery.prototype = {
		init: function(selector) {
			// Handle $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
			// Handle $(DOMElement)
			if ( selector.nodeType ) {
				this[0] = selector;
				this.length = 1;
				return this;
			}
			if (typeof selector === 'string') {
				if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {

				} else {
					var els = document.querySelectorAll(selector);
					for (var i = 0; i < els.length; i++) {
						this[i] = els[i];
					}
					this.length = els.length;
					return this;
				}
			}
		}
	}
	jQuery.fn.init.prototype = jQuery.fn;

	jQuery.prototype.map = function(callback) {
		var results = [];
		for (var i = 0; i < this.length; i++) {
			results.push(callback.call(this, this[i], i));
		}
		return results;
	};

	jQuery.prototype.forEach = function (callback) {
		this.map(callback);
		return this;
	};

	jQuery.prototype.mapOne = function (callback) {
		var m = this.map(callback);
		return m.length > 1 ? m : m[0];
	};

	jQuery.prototype.text = function (text) {
		if (typeof text !== "undefined") {
			return this.forEach(function (el) {
				if (el.innerText) {
					el.innerText = text;
				} else if (el.textContent) {
					el.textContent = text;
				}
			});
		} else {
			return this.mapOne(function (el) {
				if (el.innerText) {
					return el.innerText;
				} else if (el.textContent) {
					return el.textContent;
				}
			});
		}
	};
	jQuery.prototype.html = function (html) {
		if (typeof html !== "undefined") {
			return this.forEach(function (el) {
				el.innerHTML = html;
			});
		} else {
			return this.mapOne(function (el) {
				return el.innerHTML;
			});
		}
	};
	jQuery.prototype.addClass = function (classes) {
		var className = "";
		if (typeof classes !== 'string') {
			for (var i = 0; i < classes.length; i++) {
				className += " " + classes[i];
			}
		} else {
			className = " " + classes;
		}
		return this.forEach(function (el) {
			el.className += className;
		});
	};

	jQuery.prototype.removeClass = function (clazz) {
		return this.forEach(function (el) {
			var cs = el.className.split(' '), i;
			while ((i = cs.indexOf(clazz)) > -1) {
				cs = cs.slice(0, i).concat(cs.slice(++i));
			}
			el.className = cs.join(' ');
		});
	};
	jQuery.prototype.hasClass = function (clazz) {
		if(this.length > 0) {
			if (this[0].className.indexOf(clazz) >= 0) {
				return true;
			} else {
				return false;
			}
		}
	};
	jQuery.prototype.attr = function (attr, val) {
		if (typeof val !== 'undefined') {
			return this.forEach(function (el) {
				el.setAttribute(attr, val);
			});
		} else {
			return this.mapOne(function (el) {
				return el.getAttribute(attr);
			});
		}
	};
	jQuery.prototype.val = function (val) {
		if (typeof val !== 'undefined') {
			return this.forEach(function (el) {
				el.value = val;
			});
		} else {
			return this.mapOne(function (el) {
				if (el.nodeName == 'SELECT') {
					return el.value;
				}
			});
		}
	}
	jQuery.prototype.append = function (els) {
		return this.forEach(function (parEl, i) {
			els.forEach(function (childEl) {
				parEl.appendChild((i > 0) ? childEl.cloneNode(true) : childEl);
			});
		});
	};

	jQuery.prototype.prepend = function (els) {
		return this.forEach(function (parEl, i) {
			for (var j = els.length - 1; j > -1; j--) {
				parEl.insertBefore((i > 0) ? els[j].cloneNode(true) : els[j], parEl.firstChild);
			}
		});
	};

	jQuery.prototype.remove = function () {
		return this.forEach(function (el) {
			return el.parentNode.removeChild(el);
		});
	};

	jQuery.prototype.on = (function () {
		if (document.addEventListener) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.addEventListener(evt, fn, false);
				});
			};
		} else if (document.attachEvent) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.attachEvent("on" + evt, fn);
				});
			};
		} else {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el["on" + evt] = fn;
				});
			};
		}
	}());

	jQuery.prototype.off = (function () {
		if (document.removeEventListener) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.removeEventListener(evt, fn, false);
				});
			};
		} else if (document.detachEvent) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.detachEvent("on" + evt, fn);
				});
			};
		} else {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el["on" + evt] = null;
				});
			};
		}
	}());

	window.jQuery = window.$ = jQuery;

})( window );
