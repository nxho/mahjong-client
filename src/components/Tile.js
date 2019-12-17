import React from 'react';
import './Tile.css'

// TODO: move to components folder?
const Tile = ({ suit, type, selected, className }) => {
	const tryRequire = () => {
		let img = null;

		try {
			img = require(`../images/tiles/${suit}_${type}.png`)
		} catch (e) {
			// handle silently
		}

		return img;
	};

	const renderImg = (img_src) => {
		let localClassName = 'imgTile';
		if (!!className) {
			localClassName += ` ${className}`;
		}
		if (selected) {
			localClassName += ' imgTile--state-selected';
		}
		return (
			<img
				className={localClassName}
				src={img_src}
				alt={`${suit}_${type}`}
				draggable='false'
			/>
		);
	};

	const renderText = () => (
		<div className='textTileDiv'>
			<div>{suit.slice(0, 4)}</div>
			<div>{type}</div>
		</div>
	);

	let img_src = tryRequire();
	if (img_src) {
		return renderImg(img_src);
	} else {
		return renderText();
	}
};

export default Tile;
