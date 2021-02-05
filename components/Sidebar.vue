<template>
	<aside id="sc-sidebar-main" class="sc-sidebar-info-fixed">
		<div id="sc-sidebar-main-offcanvas-bar" class="uk-offcanvas-bar">
			<div class="sc-sidebar-main-scrollable" data-sc-scrollbar="visible-y">
				<ScMenuList :menu-data="menuEntries" :is-parent="true"></ScMenuList>
			</div>
			<div class="sc-sidebar-info">
				{{ $t('version') }}: {{ vxAppVersion }}
			</div>
		</div>
	</aside>
</template>

<script>
import { mapState } from 'vuex'
import ScMenuList from './navigation/MenuList';
import { scMq } from '~/assets/js/utils'
import { menuEntries } from './navigation/sidebar_menu'

export default {
	components: {
		ScMenuList
	},
	data: () => ({
		menuEntries
	}),
	computed: mapState([
		'vxSidebarMainExpanded',
		'vxAppVersion'
	]),
	watch: {
		'vxSidebarMainExpanded' (state) {
			if(scMq.mediumMax()) {
				if (state) {
					UIkit.offcanvas('#sc-sidebar-main').show();
					if(this.$store.getters.offcanvasState) {
						this.$store.commit('offcanvasToggle', false);
					}
				} else {
					UIkit.offcanvas('#sc-sidebar-main').hide();
				}
			}
		},
		$route () {
			if(scMq.mediumMax()) {
				this.$store.commit('sidebarMainToggle', false);
			}
		}
	},
	mounted () {
		const self = this;
		if(scMq.mediumMax()) {
			// activate UIKit offcanvas
			UIkit.offcanvas(document.getElementById('sc-sidebar-main'), {
				overlay: true,
				container: '#nuxt-wrapper'
			});
			self.$store.commit('sidebarMainToggle', false);
		}
	}
}
</script>

<style>
</style>
