import { ColorLens, PinDropSharp } from "@material-ui/icons";
import React from "react";
import GoogleMap from "./GoogleMap";

export default function Map(props) {
    return (
        <div>
            <GoogleMap lat={42.37268230000001} lon={-71.062115} />
        </div>
    )
}