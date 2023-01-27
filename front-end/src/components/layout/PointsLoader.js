import React from "react";
import ReactLoading from "react-loading";
import  '../css/Header.css';



const PointsLoader = ({ type, color }) => (
	<ReactLoading type={"spokes"} className='copounloading' color={"#B42D33"} height={70} width={70} />
);

export default PointsLoader;