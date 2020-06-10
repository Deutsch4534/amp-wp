
/**
 * External dependencies
 */
import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Nav } from '..';

let container;

const getNavButtons = ( containerElement ) => ( {
	nextButton: containerElement.querySelector( '.amp-setup-nav__next' ),
	prevButton: containerElement.querySelector( '.amp-setup-nav__prev' ),
} );

const testPages = [ { PageComponent: 'div', title: 'Page 0' }, { PageComponent: 'div', title: 'Page 1' } ];

describe( 'Nav', () => {
	beforeEach( () => {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
	} );

	afterEach( () => {
		document.body.removeChild( container );
		container = null;
	} );

	it( 'matches snapshot', () => {
		const wrapper = create( <Nav activePageIndex={ 0 } exitLink="http://site.test" pages={ testPages } setActivePageIndex={ () => null } /> );
		expect( wrapper.toJSON() ).toMatchSnapshot();
	} );

	it( 'hides previous button on first page', () => {
		act( () => {
			render( <Nav activePageIndex={ 0 } exitLink="http://site.test" pages={ testPages } setActivePageIndex={ () => null } />, container );
		} );

		const { nextButton, prevButton } = getNavButtons( container );

		expect( prevButton ).toBeNull();
		expect( nextButton ).not.toBeNull();
	} );

	it( 'disables next button on last page', () => {
		act( () => {
			render( <Nav activePageIndex={ 1 } exitLink="http://site.test" pages={ testPages } setActivePageIndex={ () => null } />, container );
		} );

		const { nextButton, prevButton } = getNavButtons( container );

		expect( prevButton ).not.toBeNull();
		expect( nextButton.hasAttribute( 'disabled' ) ).toBe( true );
	} );
} );
