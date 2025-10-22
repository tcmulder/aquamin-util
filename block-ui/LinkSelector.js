/**
 * Add link to block's floating toolbar.
 * 
 * @version 1.0.0
 */
import { link as linkIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	BlockControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
	TextControl,
} from '@wordpress/components';
import { Disabled } from '@wordpress/components';

/**
 * Link selector
 * 
 * Adds a link selector popover to the block controls.
 * 
 * @example
 *   const { link } = attributes; // { url: 'https://example.com', opensInNewTab: false, title: 'Button Title' }
 *   <LinkSelector
 *       link={link}
 *       setAttributes={setAttributes}
 *       show={isSelected}
 *   />
 * 
 * @param {Object}   props               Component props.
 * @param {Object}   props.link          Link object with url, title, and opensInNewTab properties.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {boolean}  props.show          Whether or not to show the link selector.
 */
export const LinkSelector = (props) => {
	const { link = { title: '', url: '', opensInNewTab: false }, setAttributes, show } = props;
	const [showLink, setShowLink] = useState(false);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						title={__('Edit link', 'aquamin')}
						icon={linkIcon}
						onClick={() => setShowLink(!showLink)}
						isActive={showLink}
					/>
				</ToolbarGroup>
			</BlockControls>
			{showLink && show ? (
				<Popover>
					<div style={{ margin: '16px' }}>
						<TextControl
							aria-label={__('Title', 'aquamin')}
							placeholder={__('Title', 'aquamin')}
							value={link.title}
							onChange={(value) =>
								setAttributes({
									link: { ...link, title: value },
								})
							}
						/>
					</div>
					<LinkControl
						key={link.title} // @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/link-control/README.md#ensuring-unique-instances
						aria-label={__('Url', 'aquamin')}
						placeholder={__('Title', 'aquamin')}
						onChange={(value) => {
							console.log('...', value);
							setAttributes({
								link: {
									...link,
									url: value.url,
									opensInNewTab: value.opensInNewTab,
								},
							});
						}}
						value={link}
					/>
				</Popover>
			) : null}
		</>
	);
};

/**
 * Simple link component
 *
 * This is optional: you can always just use the attribute values
 * to create your own bespoke link component.
 * 
 * @example Simple link (uses title as link text)
 * // In edit function
 * <SimpleLink link={link} editable />
 * 
 * // In save function
 * <SimpleLink link={link} />
 * 
 * @example Using inner blocks (sets title as aria-label)
 * // In edit function
 * <SimpleLink link={link} editable>
 *   {innerBlocksProps.children}
 * </SimpleLink>
 * 
 * // In save function
 * <SimpleLink link={link}>
 *   {innerBlocksProps.children}
 * </SimpleLink>
 * 
 * @param {Object}   props                    Component props.
 * @param {Object}   props.link               Link object.
 * @param {string}   props.link.url           The URL for the link.
 * @param {string}   props.link.title         The title/text for the link.
 * @param {boolean}  props.link.opensInNewTab Whether to open in new tab.
 * @param {*}        props.children           Optional children to render instead of link.title.
 * @param {boolean}  props.editable           Whether or not link is being viewed in the editor.
 * 
 */
export const SimpleLink = ({ link, children, editable }) => {
	return children ? (
		<a
			href={link?.url}
			target={link?.opensInNewTab ? '_blank' : undefined}
			rel={link?.opensInNewTab ? 'noreferrer' : undefined}
			aria-label={link?.title}
			onClick={editable ? (e) => e.preventDefault() : undefined}
		>
			{children}
		</a>
	) : (
		<a
			href={link?.url}
			target={link?.opensInNewTab ? '_blank' : undefined}
			rel={link?.opensInNewTab ? 'noreferrer' : undefined}
			onClick={editable ? (e) => e.preventDefault() : undefined}
		>
			{link?.title}
		</a>
	);
};
