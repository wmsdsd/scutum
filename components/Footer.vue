<template>
	<footer class="sc-footer sc-theme-bg-dark sc-footer-light">
		<div class="uk-flex uk-visible@m">
			<div class="uk-flex-1">
				<div class="uk-grid uk-grid-divider uk-child-width-auto uk-grid-medium uk-visible@m" data-uk-grid>
					<nuxt-link to="/pages/chat">
						{{ $t('Chat') }}
					</nuxt-link>
					<nuxt-link to="/pages/Mailbox">
						{{ $t('Mailbox') }}
					</nuxt-link>
					<nuxt-link to="/plugins/gantt_chart">
						{{ $t('Gantt Chart') }}
					</nuxt-link>
					<nuxt-link to="/pages/invoices">
						{{ $t('Invoices') }}
					</nuxt-link>
				</div>
			</div>
			<div>
				Scutum Admin Template
			</div>
		</div>
		<div class="uk-grid uk-child-width-expand uk-flex-center uk-margin-remove-top uk-grid-collapse uk-height-1-1 uk-hidden@m" data-uk-grid>
			<nuxt-link to="/pages/chat">
				<i class="mdi mdi-chat"></i>
			</nuxt-link>
			<nuxt-link to="/pages/Mailbox">
				<i class="mdi mdi-email-outline"></i>
			</nuxt-link>
			<div class="uk-width-mini"></div>
			<nuxt-link to="/plugins/gantt_chart">
				<i class="mdi mdi-chart-timeline"></i>
			</nuxt-link>
			<nuxt-link to="/pages/invoices">
				<i class="mdi mdi-receipt"></i>
			</nuxt-link>
		</div>
		<div class="sc-fab-wrapper uk-hidden@m">
			<button class="sc-fab sc-fab-secondary">
				<i class="mdi mdi-plus"></i>
			</button>
			<div class="round-corner left"></div>
			<div class="round-corner right"></div>
		</div>
	</footer>
</template>

<script>
export default {
	data: () => ({
		footerBgcolor: 'grey-800', // red-800, green-800 etc.
		footerLight: true
	}),
	computed: {
		bgColor () {
			return this.footerBgcolor !== '' ? 'md-bg-' + this.footerBgcolor : '';
		}
	}
}
</script>

<style lang="scss">
	@import "~scss/common/variables_mixins";
	@import "~scss/partials/footer";
</style>
