import '../../App';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Navbar from '../Navbar';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// <iframe src="http://maps.google.com/maps?q=25.3076008,51.4803216&z=16&output=embed" height="450" width="600"></iframe>
<script async defer src="https://maps.googleapis.com/maps/api/js?key='AIzaSyBDos4bVf2qdzhDgjzXlafS_Hko27ZrMjI'&callback=initMap"></script>
class About extends Component {
  static defaultProps = {
    center: {
      lat: 24.8607,
      lng: 67.0011
    },
    zoom: 11
  };

  render() {
    return (
      <>
      <Navbar />
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBDos4bVf2qdzhDgjzXlafS_Hko27ZrMjI" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={24.8607}
            lng={67.0011}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      </>
    );
  }
}

export default About;