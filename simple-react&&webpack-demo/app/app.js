// import $ from 'jquery';
// import React from 'react';
// import {render} from 'react-dom';

// class HelloWorld extends React.Component{
// 	render(){
// 		return(
// 			<div>Hello,World</div>
// 		);
// 	}
// }

// render(
// 	<HelloWorld />,
// 	$('#content')[0]
// );

import React from 'react'
import { render } from 'react-dom';
import $ from 'jquery';
import NewsList from './NewsList.js';

render(<NewsList />, $('#content')[0]);









