import React from "react";
import ReactLoading from "react-loading";
import spokes from "react-loading";
import  '../css/Header.css';



const Loader = ({ type, color }) => (
	<ReactLoading type={"spokes"} className='loading' color={"#B42D33"} height={70} width={70} />
);

export default Loader;