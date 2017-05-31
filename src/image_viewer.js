import big from '../assets/big.jpg';
import small from '../assets/small.jpg';

import '../scss/image_viewer.scss';

const image = document.createElement('img');
image.src = small;

document.body.appendChild(image);

const bigImage = document.createElement('img');
bigImage.src = big;

document.body.appendChild(bigImage);
