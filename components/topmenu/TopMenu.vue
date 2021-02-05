<template>
	<ul :class="{ 'uk-navbar-nav sc-top-menu': isRoot }">
		<li v-for="node in menuData"
			:key="node.id"
			:class="{
				'sc-has-submenu': node.submenu,
				'sc-js-active': node.isOpen
			}"
			@mouseover="showSubMenu(node)"
			@mouseout="hideSubMenu(node)"
		>
			<nuxt-link v-if="node.url" :to="node.url">
				{{ $t(node.title) }}
			</nuxt-link>
			<a v-else href="javascript:void(0)">
				{{ $t(node.title) }}
			</a>
			<transition name="menuFadeUp">
				<ul v-if="node.submenu" v-show="node.isOpen">
					<li v-for="subNode in node.submenu"
						:key="subNode.id"
						:class="{
							'sc-has-submenu': subNode.submenu,
							'sc-js-active': subNode.isOpen
						}"
						@mouseover="showSubMenu(subNode)"
						@mouseout="hideSubMenu(subNode)"
					>
						<nuxt-link v-if="subNode.url" :to="subNode.url">
							{{ $t(subNode.title) }}
						</nuxt-link>
						<a v-else href="javascript:void(0)">
							{{ $t(subNode.title) }}
						</a>
						<transition name="menuFadeUp">
							<ScTopMenu v-if="subNode.submenu" v-show="subNode.isOpen" :menu-data="subNode.submenu" :is-root="false" />
						</transition>
					</li>
				</ul>
			</transition>
		</li>
	</ul>
</template>

<script>

export default {
	name: 'ScTopMenu',
	props: {
		menuData: {
			type: Array,
			default: null
		},
		isRoot: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
	    node: null
	}),
	methods: {
		showSubMenu (node) {
			node.isOpen = true;
		},
		hideSubMenu (node) {
			node.isOpen = false;
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/components/top_menu';
	.menuFadeUp-enter-active,
	.menuFadeUp-leave-active {
	    transition: all 220ms $easing;
	}
	.menuFadeUp-enter,
	.menuFadeUp-leave-to {
	    opacity: 0;
	    transform: translateY(10%);
	}
</style>
