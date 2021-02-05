<template>
	<nuxt />
</template>

<script>
export default {
	head: {
		htmlAttrs: {
			class: 'sc-login-page'
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	.sc-login-page {
		body {
			overflow: auto;
			padding: 24px;
			background: material-color('grey', '400');
		}
		body,
		#__nuxt,
		#__layout {
			height: 100%;
		}
		&-wrapper {
			height: calc(100vh - 48px);
			@include respond-below(medium) {
				height: auto;
				align-items: flex-start;
			}
		}
		&-inner {
			padding: 16px;
			@include respond-below(medium) {
				padding: 8px 0;
			}
		}
		&-logo {
			padding: 24px;
			margin-bottom: 16px;
			text-align: center;
			@include respond-below(medium) {
				padding: 12px 24px;
				margin-bottom: 8px;
			}
		}
	}
</style>
