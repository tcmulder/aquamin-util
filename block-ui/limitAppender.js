/**
 * Limit number of inner blocks that can be appended
 *
 * Returns `null`, which shows Gutenberg's built in
 * appender, until the limit is reached; then, returns
 * `false` which prevents the appender from showing.
 *
 * @example
 * import limitAppender from './limitAppender'
 * export const SomeEditBlock = ({ clientId }) => (
 *     <InnerBlocks
 *         renderAppender={limitAppender(5, clientId)}
 *     />
 * )
 * 
 * @param {number} limit    Maximum number of inner blocks allowed
 * @param {string} clientId Client ID of the parent block
 * @return {null|false} null to show appender, false to hide it
 * @version 1.0.0
 */
import { select } from '@wordpress/data';

const limitAppender = (limit, clientId) => {
	const parentBlock = select('core/editor')
		.getBlocksByClientId(clientId)
		.at(-1);
	const childBlocks = parentBlock ? parentBlock.innerBlocks : [];
	return childBlocks.length < limit ? null : false;
};

export default limitAppender;
