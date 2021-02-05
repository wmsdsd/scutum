<template>
	<div>
		<Header ref="mainHeader" />
		<Sidebar v-if="!vxTopMenuActive" />
		<nuxt />
		<Footer v-if="vxFooterActive"></Footer>
		<StyleSwitcher></StyleSwitcher>
		<ScProgressOverlayRoot></ScProgressOverlayRoot>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'

import Header from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar.vue';
import Footer from '~/components/Footer.vue';
import { ScProgressOverlayRoot } from '~/components/progress'

// main styles
require('assets/scss/main.scss');

export default {
	components: {
		Header,
		Sidebar,
		StyleSwitcher: () => import('~/components/StyleSwitcher'),
		ScProgressOverlayRoot,
		Footer
	},
	data: () => ({
		HTMLClasses: {
			activeTheme: '',
			pageFixedClass: '',
			cardFixedClass: '',
			headerExpandedClass: '',
			sidebarMainExpanded: '',
			cmFullscreenClass: '',
			footerActive: '',
			fullWidth: '',
			sidebarMini: ''
		},
		footerActive: false
	}),
	computed: {
		...mapState([
			'vxAppTheme',
			'vxCardFixed',
			'vxPageFixed',
			'vxHeaderExpanded',
			'vxSidebarMainExpanded',
			'vxSidebarMiniActive',
			'vxCodeMirrorFullscreen',
			'vxFooterActive',
			'vxTopMenuActive',
			'vxFullWidthActive',
			'vxActiveLocale'
		])
	},
	watch: {
		'vxAppTheme' (theme) {
			this.HTMLClasses.activeTheme = (theme !== 'theme-default') ? 'sc-' + theme : '';
			this.mergeHTMLClasses()
		},
		'vxCardFixed' (value) {
			this.$nextTick(() => {
				// update header
				setTimeout(() => {
					UIkit.update(this.$refs.mainHeader.$el);
				}, 150);
				this.HTMLClasses.cardFixedClass = value ? 'sc-card-fixed' : '';
				this.mergeHTMLClasses()
			})
		},
		'vxPageFixed' (value) {
			// update header
			setTimeout(() => {
				UIkit.update(this.$refs.mainHeader.$el);
			}, 150);
			this.HTMLClasses.pageFixedClass = value ? 'sc-page-fixed' : '';
			this.mergeHTMLClasses()
		},
		'vxHeaderExpanded' (value) {
			this.HTMLClasses.headerExpandedClass = value ? 'sc-header-expanded' : '';
			this.mergeHTMLClasses()
		},
		'vxSidebarMainExpanded' (value) {
			this.HTMLClasses.sidebarMainExpanded = scMq.mediumMin()
				?
				value ? '' : 'sc-sidebar-main-slide'
				:
				value ? 'sc-sidebar-main-visible' : '';
			this.mergeHTMLClasses()
		},
		'vxSidebarMiniActive' (value) {
			console.log(value)
			this.HTMLClasses.sidebarMini = value ? 'sc-sidebar-mini' : '';
			this.mergeHTMLClasses()
		},
		'vxCodeMirrorFullscreen' (value) {
			this.HTMLClasses.cmFullscreenClass = value ? 'CodeMirror-fullscreen-active' : '';
			this.mergeHTMLClasses()
		},
		'vxFooterActive' (value) {
			this.footerActive = value;
			this.HTMLClasses.footerActive = value ? 'sc-footer-active' : '';
			this.mergeHTMLClasses()
		},
		'vxFullWidthActive' (value) {
			this.HTMLClasses.fullWidth = value ? 'sc-content-full-width' : '';
			this.mergeHTMLClasses()
		}
	},
	mounted () {
		this.$nextTick(() => {
			if(scMq.mediumMin()) {
				this.HTMLClasses.sidebarMainExpanded = this.$store.getters.sidebarMainState ? '' : 'sc-sidebar-main-slide';
				this.mergeHTMLClasses();
			}
			// update locale on page load
			this.$store.commit('updateLocale', this.$i18n.locale);
		});
		// uncomment following lines to activate user theme
		// hex colors
		// this.HTMLClasses.activeTheme = 'sc-theme-user';
		// material design colors
		// this.HTMLClasses.activeTheme = 'sc-theme-user-md';
		// this.getHTMLClasses();
	},
	methods: {
		mergeHTMLClasses () {
			const HTML = document.getElementsByTagName("html")[0] || document.querySelector("html");
			HTML.className = Object.keys(this.HTMLClasses).map(key => { return this.HTMLClasses[key] }).join(' ').trim();
		}
	},
	head () {
		return {
			'title': 'Scutum Admin - ' + this.$route.path
		}
	}
}
</script>

<style lang="scss">
	.sc-page-fixed,
	.sc-card-fixed {
		&,
		body,
		#__nuxt,
		#__layout {
			height: 100%;
		}
	}
	@import '~scss/themes/base';
	@import "~scss/themes/theme_a";
	@import "~scss/themes/theme_b";
	@import "~scss/themes/theme_c";
	@import "~scss/themes/theme_d";
	@import "~scss/themes/theme_e";
	@import "~scss/themes/theme_f";
	@import "~scss/themes/theme_g";
	@import "~scss/themes/theme_h";
	@import "~scss/themes/theme_user";
	@import "~scss/themes/theme_user_md";
</style>
