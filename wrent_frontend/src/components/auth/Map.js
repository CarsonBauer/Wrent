import { ColorLens, PinDropSharp } from "@material-ui/icons";
import React from "react";
import GoogleMap from "./GoogleMap";

export default function Map(props) {
    return (
        <div>
            <GoogleMap lat={props.params['lat']} lon={props.params['lon']} width='97%' height='80%' />
        </div>
    )
}