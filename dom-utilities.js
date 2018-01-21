/*****************
		Private Fns
*****************/
const _version = '1.0.0';

// Breadth first search, starting
// From given DOM object
function _bfs(obj, cb) {
	const htmlNode = [obj];

	let node;

  while (htmlNode.length > 0) {

    htmlNode.forEach(() => {
      node = htmlNode.shift();
      // Run callback
      cb(node);
      // Destructure to get children
      const {
      	children
      } = node;

      if (children) {
        children.forEach(e => {
          htmlNode.push(e);
        });
      }
    });
  }
}

// Depth first search, starting
// From given DOM object
function _dfs(obj, cb) { 
	// Recursive fn
	function _walk(current) {
		// Run callback
		cb(current);
		// Destructure to get children
		const {
			children
		} = current;

		if (children) {
			children.forEach(e => {
				_walk(e);
			});
		}
	};

	walk(obj);
}

/*****************
		Public Fns
*****************/
export default {
	/*****************
				CLASSES 
	*****************/
	// Add class to an element
	addClass(e, className) {
		if (!e || !className) {
			throw new Error('Element and classname must be defined');
		}

		if (typeof e === 'string') e = document.querySelectorAll(e);
		const es = (e instanceof NodeList) ? [].slice.call(e) : [e];

		es.forEach((el) => {
			if (this.hasClass(el, className)) return;
			if (el.classList) {
				el.classList.add(className);
			} else {
				el.className += ' ' + className;
			}
		});
	},

	// Check if element has the specified class
	hasClass(e, className) {
		if (!e || !className) {
			throw new Error('Element and classname must be defined');
		}

		if (typeof e === 'string') e = document.querySelector(e);
		if (e.classList) {
			return e.classList.contains(className);
		}
		// Hacky thing to check using regexp
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(e.className);
	},

	removeClass(e, className) {
		if (!e || !className) {
			throw new Error('Element and classname must be defined');
		}

		if (typeof e === 'string') e = document.querySelectorAll(e);
		const es = (e instanceof NodeList) ? [].slice.call(e) : [e];

		es.forEach(el => {
			if (this.hasClass(el, className)) {
				if (el.classList) {
					el.classList.remove(className);
				} else {
					el.className = el.className.replace(
						new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}
		})
	},

	/*****************
				STYLES 
	*****************/
	// Check if element is in viewport
	inViewport(e) {
		var rect = e.getBoundingClient();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	    	rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		);
	},

	// Fade in / out an element
	fade(e, speed, type, cb) {
		if (!e || !speed || !type) {
			throw new Error('Element, Speed and Type must be defined')
		}

		if (!e.style.opacity) {
			e.style.opacity = type === 'in' ? 0 : 1;
		}
		let start = null;

		window.requestAnimationFrame(
			function animate(ts) {
				start = start || ts;
				let progress = ts - start;
				e.style.opacity = type === 'in' 
													? progress / speed
													: 1 - progress / speed;

				if (progress >= speed) {
					if (cb && typeof(cb) === 'function') {
						cb();
					}
				} else {
					window.requestAnimationFrame(animate);
				}
			}
		);
	},


	// Set the style for an element
	setStyle(e, att, style, val, unit='px') {
		if (!e || !att || !style || !val || !unit) {
			throw new Error('Node, Attribute, Style, Unit, and Value must all be defined');
		}

		if (typeof att === 'string' && typeof val === 'string' && typeof unit ==='string') {
			e.style[att] = val += unit;
		}
	},

	/*****************
			TRAVERSE 
	*****************/
	// Traverse dom
	traverseDom(domObject, traverseType, cb) {
		// Check if callback is a function
		if (!cb || typeof(cb) !== "function") {
			throw new Error('Callback is not a function or is not defined');
		}

		if (domObject === null || domObject === undefined) {
			throw new Error('Dom object cannot be null or undefined');
		}

		// Switch based on type
		switch(type) {
			case 'bfs':
				_bfs(domObject, cb);
				break;
			case 'dfs':
				_dfs(domObject, cb);
				break;
			default:
				throw new TypeError('Traverse Type is not one of dfs or bfs');
		}
	},

	// Current version
	version() {
		return _version;
	}
};