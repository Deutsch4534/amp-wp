/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useRef } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

/**
 * External dependencies
 */
import { ACTIVE_THEME } from 'amp-setup'; // From inline JS script.

/**
 * Internal dependencies
 */
import { Navigation } from '../../components/navigation-context-provider';
import { Options } from '../../components/options-context-provider';
import './style.css';
import { ReaderThemes } from '../../components/reader-themes-context-provider';

/**
 * Screen showing site configuration details.
 */
export function SiteConfigurationSummary() {
	const { canGoForward, setCanGoForward } = useContext( Navigation );
	const { options: { mobile_redirect: mobileRedirect }, editOptions } = useContext( Options );
	const { selectedTheme } = useContext( ReaderThemes );

	// This component sets state inside async functions. Use this ref to prevent state updates after unmount.
	const hasUnmounted = useRef( false );

	/**
	 * Allow moving forward.
	 */
	useEffect( () => {
		if ( selectedTheme && canGoForward === false ) {
			setCanGoForward( true );
		}
	}, [ selectedTheme, canGoForward, setCanGoForward ] );

	useEffect( () => () => {
		hasUnmounted.current = true;
	}, [] );

	return (
		<div className="amp-site-configuration-summary">
			<p>
				{ __( 'Users will see the site differently depending on devide and site options. You have selected a reader theme that will display a different version of your site to users viewing AMP pages.', 'amp' ) }
			</p>
			<CheckboxControl
				className="amp-site-configuration-summary__checkbox"
				label={ __( 'Redirect mobile visitors to AMP. Visitors on mobile devices will see AMP pages regardless of how they arrive on the site.', 'amp' ) }
				checked={ mobileRedirect === true }
				onChange={ ( newValue ) => {
					editOptions( { mobile_redirect: newValue } );
				} }
			/>

			<div className="amp-site-configuration-summary__theme-previews">
				<div className="amp-site-configuration-summary__desktop-preview">
					<h2>
						{ ACTIVE_THEME.name }
					</h2>
					<div className="amp-site-configuration-summary__screenshot-description">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.21875 0.0703125H18C18.3438 0.0703125 18.625 0.195313 18.8438 0.445312C19.0938 0.664063 19.2188 0.945313 19.2188 1.28906V13.2891C19.2188 13.6016 19.0938 13.8828 18.8438 14.1328C18.625 14.3516 18.3438 14.4609 18 14.4609H12V16.8984H14.3906C14.7344 16.8984 15.0156 17.0234 15.2344 17.2734C15.4844 17.4922 15.6094 17.7578 15.6094 18.0703V19.2891H3.60938V18.0703C3.60938 17.7578 3.71875 17.4922 3.9375 17.2734C4.1875 17.0234 4.48438 16.8984 4.82812 16.8984H7.21875V14.4609H1.21875C0.875 14.4609 0.578125 14.3516 0.328125 14.1328C0.109375 13.8828 0 13.6016 0 13.2891V1.28906C0 0.945313 0.109375 0.664063 0.328125 0.445312C0.578125 0.195313 0.875 0.0703125 1.21875 0.0703125ZM16.8281 10.8984V2.46094H2.39062V10.8984H16.8281ZM3.60938 3.67969H14.3906L3.60938 8.46094V3.67969Z" fill="black" fillOpacity="0.87" />
						</svg>

						{ __( 'Desktop visitors', 'amp' ) }
					</div>
					{
						ACTIVE_THEME.screenshot_url
							? <img src={ ACTIVE_THEME.screenshot_url } alt={ __( 'Active theme screenshot', 'amp' ) } />
							: (
								<p>
									{ __( 'No screenshot available', 'amp' ) }
								</p>
							)
					}
				</div>

				<div className="amp-site-configuration-summary__reader-preview">

					{ selectedTheme
						? (
							<h2>
								{ selectedTheme.name }
							</h2>
						)
						: (
							<p>
								{ __( 'No reader theme selected. Navigate to the previous step to select one.', 'amp' ) }
							</p>
						)
					}

					<div className="amp-site-configuration-summary__screenshot-description">
						<svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.82812 0.0703125H11.3906C11.7344 0.0703125 12.0156 0.195313 12.2344 0.445312C12.4844 0.664063 12.6094 0.945313 12.6094 1.28906V18.0703C12.6094 18.4141 12.4844 18.7109 12.2344 18.9609C12.0156 19.1797 11.7344 19.2891 11.3906 19.2891H1.82812C1.48438 19.2891 1.1875 19.1797 0.9375 18.9609C0.71875 18.7109 0.609375 18.4141 0.609375 18.0703V1.28906C0.609375 0.945313 0.71875 0.664063 0.9375 0.445312C1.1875 0.195313 1.48438 0.0703125 1.82812 0.0703125ZM10.2188 14.4609V2.46094H3V14.4609H10.2188ZM4.21875 3.67969H9L4.21875 9.67969V3.67969Z" fill="black" fillOpacity="0.87" />
						</svg>

						{ __( 'Mobile/AMP visitors', 'amp' ) }
					</div>
					{
						selectedTheme && selectedTheme.screenshot_url
							? <img src={ selectedTheme.screenshot_url } alt={ __( 'Selected reader theme screenshot', 'amp' ) } />
							: (
								<p>
									{ __( 'No screenshot available', 'amp' ) }
								</p>
							)
					}
				</div>
			</div>
		</div>
	);
}
