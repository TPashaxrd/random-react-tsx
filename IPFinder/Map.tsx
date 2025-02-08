import React, { useEffect, useState } from 'react'; 
import ReactMapGL, { Marker } from 'react-map-gl'; 
import { RiUserLocationFill } from 'react-icons/ri'; 

const API_KEY = '<YOUR_API_KEY>'; 

const Map = ({ lat, lon }) => { 

	const [viewport, setViewport] = useState({ 
		latitude: lat, 
		longitude: lon, 
		zoom: 14, 
		bearing: 0, 
		pitch: 0, 
		width: '100%', 
		height: '100%', 
	}); 

	useEffect(() => { 
		const a = { ...viewport }; 
		a.latitude = lat; 
		a.longitude = lon; 
		setViewport(a); 
	}, [lat, lon]); 

	return ( 
		<div className="map"> 
			<ReactMapGL 
				mapboxApiAccessToken={API_KEY} 
				{...viewport} 
				onViewportChange={(viewport) => setViewport(viewport)} 
				mapStyle="mapbox://styles/mapbox/streets-v11"> 
				<Marker latitude={lat} longitude={lon}> 
					<div className="mark"> 
						<RiUserLocationFill size="25px" color="blue" /> 
					</div> 
				</Marker> 
			</ReactMapGL> 
		</div> 
	); 
}; 

export default Map;
