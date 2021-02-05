// https://github.com/leafo/sticky-kit/pull/224
/**
 @license Sticky-kit v1.1.4 | MIT | Leaf Corcoran 2015 | http://leafo.net
 */
var $, doc, win, scroll_container;
$ = window.jQuery;
win = $(window);
doc = $(document);
scroll_container = win;

$.fn.stick_in_parent = function (opts) {
	var container, doc_height, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, outer_width, parent_selector, recalc_every, sticky_class, sticky_class_bottom, win_height;
	if (opts == null) {
		opts = {};
	}
	sticky_class = opts.sticky_class;
	sticky_class_bottom = opts.sticky_class_bottom;
	inner_scrolling = opts.inner_scrolling;
	recalc_every = opts.recalc_every;
	parent_selector = opts.parent;
	offset_top = opts.offset_top;
	manual_spacer = opts.spacer;
	enable_bottoming = opts.bottoming;
	container = opts.container;
	win_height = win.height();
	doc_height = doc.height();
	if (offset_top == null) {
		offset_top = 0;
	}
	if (parent_selector == null) {
		parent_selector = void 0;
	}
	if (inner_scrolling == null) {
		inner_scrolling = true;
	}
	if (sticky_class == null) {
		sticky_class = "is-stuck";
	}
	if (sticky_class_bottom == null) {
		sticky_class_bottom = "is-stuck-bottom";
	}
	if (enable_bottoming == null) {
		enable_bottoming = true;
	}
	if (manual_spacer != null) {
		win = container;
	}
	if (container != null) {
		scroll_container = $(container);
	}
	outer_width = function (el) {
		var _el, computed, w;
		if (window.getComputedStyle) {
			_el = el[0];
			computed = window.getComputedStyle(_el);
			w = parseFloat(computed.getPropertyValue("width")) + parseFloat(computed.getPropertyValue("margin-left")) + parseFloat(computed.getPropertyValue("margin-right"));
			if (computed.getPropertyValue("box-sizing") !== "border-box") {
				w += parseFloat(computed.getPropertyValue("border-left-width")) + parseFloat(computed.getPropertyValue("border-right-width")) + parseFloat(computed.getPropertyValue("padding-left")) + parseFloat(computed.getPropertyValue("padding-right"));
			}
			return w;
		} else {
			return el.outerWidth(true);
		}
	};
	fn = function (elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
		var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
		if (elm.data("sticky_kit")) {
			return;
		}
		elm.data("sticky_kit", true);
		last_scroll_height = doc_height;
		parent = elm.closest('.sc-js-sticky-parent').length ? elm.closest('.sc-js-sticky-parent') : elm.parent();
		if (parent_selector != null) {
			parent = parent.closest(parent_selector);
		}
		if (!parent.length) {
			throw new Error("failed to find stick parent");
		}
		fixed = false;
		bottomed = false;
		spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
		if (spacer) {
			spacer.css('position', elm.css('position'));
		}
		recalc = function () {
			var border_top, padding_top, restore;
			if (detached) {
				return;
			}
			win_height = win.height();
			doc_height = doc.height();
			last_scroll_height = doc_height;
			border_top = parseInt(parent.css("border-top-width"), 10);
			padding_top = parseInt(parent.css("padding-top"), 10);
			padding_bottom = parseInt(parent.css("padding-bottom"), 10);
			parent_top = parent.offset().top + border_top + padding_top + win.scrollTop();
			parent_height = parent.height();
			if (fixed) {
				fixed = false;
				bottomed = false;
				if (manual_spacer == null) {
					elm.insertAfter(spacer);
					spacer.detach();
				}
				elm.css({
					position: "",
					top: "",
					width: "",
					bottom: ""
				}).removeClass(sticky_class).removeClass(sticky_class_bottom);
				restore = true;
			}
			top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top + win.scrollTop();
			height = elm.outerHeight(true);
			el_float = elm.css("float");
			if (spacer) {
				spacer.css({
					width: outer_width(elm),
					height: height,
					display: elm.css("display"),
					"vertical-align": elm.css("vertical-align"),
					"float": el_float
				});
			}
			if (restore) {
				return tick();
			}
		};
		recalc();
		if (height === parent_height) {
			return;
		}
		last_pos = void 0;
		offset = offset_top;
		recalc_counter = recalc_every;
		tick = function () {
			var css, delta, recalced, scroll, will_bottom;
			if (detached) {
				return;
			}
			recalced = false;
			if (recalc_counter != null) {
				recalc_counter -= 1;
				if (recalc_counter <= 0) {
					recalc_counter = recalc_every;
					recalc();
					recalced = true;
				}
			}
			if (!recalced && doc_height !== last_scroll_height) {
				recalc();
				recalced = true;
			}
			scroll = scroll_container.scrollTop();
			if (last_pos != null) {
				delta = scroll - last_pos;
			}
			last_pos = scroll;
			height = elm.outerHeight(true);
			if (fixed) {
				if (enable_bottoming) {
					will_bottom = scroll + height + offset > parent_height + parent_top;
					if (bottomed && !will_bottom) {
						bottomed = false;
						elm.removeClass(sticky_class_bottom).css({
							position: "fixed",
							bottom: "",
							top: offset
						}).trigger("sticky_kit:unbottom");
					}
				}
				if (scroll < top) {
					fixed = false;
					offset = offset_top;
					if (manual_spacer == null) {
						if (el_float === "left" || el_float === "right") {
							elm.insertAfter(spacer);
						}
						spacer.detach();
					}
					css = {
						position: "",
						width: "",
						top: ""
					};
					elm.css(css).removeClass(sticky_class).removeClass(sticky_class_bottom).trigger("sticky_kit:unstick");
				}
				if (inner_scrolling) {
					if (height + offset_top > win_height) {
						if (!bottomed) {
							offset -= delta;
							offset = Math.max(win_height - height, offset);
							offset = Math.min(offset_top, offset);
							if (fixed) {
								elm.css({
									top: offset + "px"
								});
							}
						}
					}
				}
			} else {
				if (scroll > top) {
					fixed = true;
					css = {
						position: "fixed",
						top: offset
					};
					css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
					elm.css(css).addClass(sticky_class);
					if (manual_spacer == null) {
						elm.after(spacer);
						if (el_float === "left" || el_float === "right") {
							spacer.append(elm);
						}
					}
					last_scroll_height = doc.height();
					elm.trigger("sticky_kit:stick");
				}
			}
			if (fixed && enable_bottoming) {
				if (will_bottom == null) {
					will_bottom = scroll + height + offset > parent_height + parent_top;
				}
				if (!bottomed && will_bottom) {
					bottomed = true;
					if (parent.css("position") === "static") {
						parent.css({
							position: "relative"
						});
					}
					return elm.addClass(sticky_class_bottom).css({
						position: "absolute",
						bottom: padding_bottom,
						top: "auto"
					}).trigger("sticky_kit:bottom");
				}
			}
		};
		recalc_and_tick = function () {
			recalc();
			return tick();
		};
		detach = function () {
			detached = true;
			scroll_container.off("touchmove", tick);
			scroll_container.off("scroll", tick);
			$(window).off("resize", recalc_and_tick);
			$(document.body).off("sticky_kit:recalc", recalc_and_tick);
			elm.off("sticky_kit:detach", detach);
			elm.removeData("sticky_kit");
			elm.css({
				position: "",
				bottom: "",
				top: "",
				width: ""
			});
			parent.position("position", "");
			if (fixed) {
				if (manual_spacer == null) {
					if (el_float === "left" || el_float === "right") {
						elm.insertAfter(spacer);
					}
					spacer.remove();
				}
				return elm.removeClass(sticky_class);
			}
		};
		scroll_container.on("touchmove", tick);
		scroll_container.on("scroll", tick);
		$(window).on("resize", recalc_and_tick);
		$(document.body).on("sticky_kit:recalc", recalc_and_tick);
		elm.on("sticky_kit:detach", detach);
		return setTimeout(tick, 0);
	};
	for (i = 0, len = this.length; i < len; i++) {
		elm = this[i];
		fn($(elm));
	}
	return this;
};
