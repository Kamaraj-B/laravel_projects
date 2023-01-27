import React from "react";
import ReactLoading from "react-loading";
import spokes from "react-loading";
import  '../css/Header.css';



const TableLoader = ({ type, color }) => (
	<ReactLoading type={"spokes"} className='tableloading' color={"#B42D33"} height={70} width={70} />
);

export default TableLoader;