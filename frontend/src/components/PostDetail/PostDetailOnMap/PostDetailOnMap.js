import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl} from "react-map-gl";
// import {useHistory} from "react-router-dom";

const navControlStyle= {
    right: 10,
    top: 10
};


export default function PostDetailOnMap({post}) {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: "100%",
        height: "500px",
        zoom: 10
    });

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg'
                mapStyle="mapbox://styles/zli786/cknqui4de047a18qrip6y1kib"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >

                <NavigationControl style={navControlStyle} />
            </ReactMapGL>

        </div>
    )
}