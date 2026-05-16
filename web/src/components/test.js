// change this class based to functional please 
import React, { Component } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

import { Polyline } from "@react-google-maps/api";

import driverImage from "../../index2.jpg";

import passengerImage from "../../index4.jpg";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoundaboutLeftIcon from "@mui/icons-material/RoundaboutLeft";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Badge from "@mui/material/Badge";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <ViewReservation {...props} match={match} />;
  };
}

// const containerStyle = {
//     height: "400px",
//     width: "400px",

//   };

const center = {
  lat: 8.98,
  lng: 38.75,
};

const onLoad = (polyline) => {
  console.log("polyline: ", polyline);
};

const path = [
  { lat: 9.0205, lng: 38.8024 },
  { lat: 8.9831, lng: 38.8101 },
];

// const useStyles = makeStyles({
//   sampleIcon: {
//     fontSize: '200px',  // Adjust the size as needed
//     color: 'gray',
//   },
// });
const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 100,

  paths: [
    { lat: 40.6655101, lng: -73.89188969999998 },
    { lat: 40.659569, lng: -73.933783 },
  ],
  zIndex: 1,
};

export class ViewReservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passengerId: "",
      pickUpLocationLatitude: "",
      pickUpLocationLongitude: "",
      destinationLocationLatitude: "",
      destinationLocationLongitude: "",
      destinationPlace: "",
      pickUpPlace: "",
      destinationTime: "",
      pickUpTime: "",
      dropOffTime: "",
      driverFirstName: "",
      driverLastName: "",
      driverPhoneNumber: "",
      driverRating: "",
      driverImage: "",

      passengerFirstName: "",
      passengerLastName: "",
      passengerPhoneNumber: "",
      passengerRating: "",
      passengerImage: "",
      response: null,
      travelMode: "DRIVING",
      origin: "",
      destination: "",
      lat: "",
      lng: "",
      loading: true,
      fetched: false,
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.checkDriving = this.checkDriving.bind(this);
    this.checkBicycling = this.checkBicycling.bind(this);
    this.checkTransit = this.checkTransit.bind(this);
    this.checkWalking = this.checkWalking.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  directionsCallback(response) {
    console.log(response);

    if (!this.fetched) {
      if (response !== null) {
        if (response.status === "OK") {
          this.fetched = true;
          this.setState(() => ({
            response,
          }));
        } else {
          console.log("response: ", response);
        }
      }
    }
  }

  checkDriving({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "DRIVING",
      }));
  }

  checkBicycling({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "BICYCLING",
      }));
  }

  checkTransit({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "TRANSIT",
      }));
  }

  checkWalking({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "WALKING",
      }));
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  onClick() {
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  }

  onMapClick(...args) {
    console.log("onClick args: ", args);
  }
  notifyError = () =>
    toast.error("Something went wrong ...", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  componentDidMount() {
    let id = this.props.match.params.id;

    axios
      .get("/tripDetails/" + id)
      .then((res) => {
        console.log("da0", res.data);
        this.setState({
          passengerId: res.data.passengerId,
          pickUpLocationLatitude: res.data.pickUpLocationLatitude,
          pickUpLocationLongitude: res.data.pickUpLocationLongitude,
          destinationLocationLatitude: res.data.destinationLocationLatitude,
          destinationLocationLongitude: res.data.destinationLocationLongitude,
          pickUpTime: res.data.pickUpTime,
          dropOffTime: res.data.dropOffTime,
          lat: res.data.currentLocationLatitude,
          lng: res.data.currentLocationLongitude,

          origin:
            res.data.pickUpLocationLatitude +
            "," +
            res.data.pickUpLocationLongitude,
          destination:
            res.data.destinationLocationLatitude +
            "," +
            res.data.destinationLocationLongitude,
         
         
          pickUpPlace: res.data.pickUpPlace,
          destinationPlace: res.data.destinationPlace,
          totalDistance: res.data.totalDistance,
          actualTotalDistance: res.data.actualTotalDistance,
          estimatedPrice: res.data.estimatedPrice,
          actualPrice: res.data.actualPrice,
          status: res.data.status,

          driverFirstName: res.data.driver.firstName,
          driverLastName: res.data.driver.lastName,
          driverPhoneNumber: res.data.driver.phoneNumber,
          driverRating: res.data.driver.rating,
          driverImage: res.data.driver.driverImage,

          passengerFirstName: res.data.passenger.firstName,
          passengerLastName: res.data.passenger.lastName,
          passengerPhoneNumber: res.data.passenger.phoneNumber,
          passengerRating: res.data.passenger.rating,
          passengerImage: res.data.passenger.passengerImage,
          loading: false,
        });
      })
      .catch((err) => {
        this.notifyError();
      });
    console.log(this.state.origin);
  }

  render() {
    var newLat;
    var newLng;

    if (this.state.lat !== null) {
      newLat = this.state.lat.replace(/^"(.*)"$/, "$1");
      newLng = this.state.lng.replace(/^"(.*)"$/, "$1");
    }

    if (this.state.loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    if (!this.state.loading) {
      return (
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
          {/* <div className="row" style={{ marginLeft: 300, marginTop: 30 }}>
            <div className="col-md-4">
              <Card sx={{ maxWidth: 300 }}>
                <CardActions>
                  <Button size="small">Passenger</Button>
                </CardActions>

                <img src={
                  process.env.REACT_APP_BASE_URL +
                  this.state.passengerImage
                } width="300px" height="200px"></img>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <PersonIcon color="primary" />  {this.state.passengerFirstName} &nbsp;
                    {this.state.passengerLastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating
                      name="read-only"
                      value={this.state.passengerRating}
                      readOnly
                    />
                    <LocalPhoneIcon color="primary" /> {this.state.passengerPhoneNumber}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="col-md-4">
              <Card sx={{ maxWidth: 300 }}>
                <CardActions>
                  <Button size="small">Driver</Button>
                </CardActions>

                <img src={process.env.REACT_APP_BASE_URL  +
                  this.state.driverImage} width="300px" height="200px"></img>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <PersonIcon color="primary" /> {this.state.driverFirstName} &nbsp;{this.state.driverLastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating
                      name="read-only"
                      value={this.state.driverRating}
                      readOnly
                    />

                    <LocalPhoneIcon color="primary" /> {this.state.driverPhoneNumber}
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div className="col-md-4">
              <Card sx={{ maxWidth: 345 }}>
                <CardActions>
                  <Button size="small">Trip Info</Button>
                </CardActions>

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  ></Typography>
                  <Typography variant="body2" color="text.secondary">
                    <LocationOnRoundedIcon color="primary" />   Pick Up Location: {this.state.pickUpPlace}
                    <br /><br />

                    <AccessTimeIcon color="primary" />   Pick Up Time:{format(new Date(this.state.pickUpTime), 'p, dd/MM/yyyy')}
                    <br /><br />
                    <LocationOnRoundedIcon color="primary" />Destination: {this.state.destinationPlace}
                    <br /><br />
                    {this.state.status == "Active" &&
                      <div>
                    <AccessTimeIcon color="primary" />   Drop Off Time:On Ride
                    <br /><br />

                    </div>}

                    {this.state.status == "Ended" &&
                      <div>
                    <AccessTimeIcon color="primary" />   Drop Off Time:{format(new Date(this.state.dropOffTime), 'p, dd/MM/yyyy')}
                    <br /><br />

                    </div>}
                    {this.state.status == "Active" &&
                      <div>

                        <RoundaboutLeftIcon color="primary" />

                        Estimated Distance:{this.state.totalDistance} KM
                        <br /><br />
                      </div>}
                      {this.state.status == "Ended" &&
                      <div>

                    <RoundaboutLeftIcon color="primary" />

                    Actual Distance:{this.state.actualTotalDistance} KM
                    <br /><br />
                    </div>}

                    {this.state.status == "Active" &&
                      <div>
                    <MonetizationOnRoundedIcon color="primary" /> Estimated Price : {parseFloat(this.state.estimatedPrice).toFixed(2)}ETB<br /><br />
                    </div>}

                    {this.state.status == "Ended" &&
                      <div>
                    <MonetizationOnRoundedIcon color="primary" /> Amount Paid : {parseFloat(this.state.actualPrice).toFixed(2)}ETB<br /><br />
                    </div>}
                    <AutorenewIcon color="primary" /> Status : &nbsp;&nbsp;&nbsp;&nbsp;
                    {this.state.status == "Active" &&

                      <Badge badgeContent={this.state.status} color="warning">

                      </Badge>

                    }

                    {this.state.status == "Ended" &&

                      <Badge badgeContent={this.state.status} color="success">

                      </Badge>}


                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div> */}

          <div className="flex row" style={{ marginLeft: 300, marginTop: 30 }}>
            <div className="col-md-4">
              <Card
                className="card"
                style={{
                  maxWidth: 400,
                  boxShadow: " rgba(0, 0, 0, 0.09) 0px 3px 12px 0px",
                  borderRadius: "10px",
                }}
              >
                <CardActions>
                  <Button size="small">Passenger</Button>
                </CardActions>

                {this.state.passengerImage ? (
                  <img
                    className="card-image"
                    src={`${
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/passengers/images/"
                    }${this.state.passengerImage}`}
                    alt="Passenger"
                  />
                ) : (
                  <PersonIcon
                    style={{
                      fontSize: "400px",
                      maxHeight: "230px", // Adjust the size as needed
                      color: "gray",
                    }}
                  />
                )}

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <PersonIcon color="primary" />{" "}
                    {this.state.passengerFirstName}{" "}
                    {this.state.passengerLastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating
                      name="read-only"
                      value={this.state.passengerRating}
                      readOnly
                    />
                    <LocalPhoneIcon color="primary" />{" "}
                    {this.state.passengerPhoneNumber}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="col-md-4">
              <Card
                className="card"
                style={{
                  maxWidth: 400,
                  boxShadow: " rgba(0, 0, 0, 0.09) 0px 3px 12px 0px",
                  borderRadius: "10px",
                }}
              >
                <CardActions>
                  <Button size="small">Driver</Button>
                </CardActions>

                {this.state.driverImage ? (
                  <img
                    className="card-image"
                    src={`${
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/drivers/images/"
                    }${this.state.driverImage}`}
                    alt="Passenger"
                    style={{ maxHeight: "230px" }} // Adjust the maximum height as needed
                  />
                ) : (
                  <PersonIcon
                    style={{
                      fontSize: "400px",
                      maxHeight: "230px", // Adjust the size as needed
                      color: "gray",
                    }}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <PersonIcon color="primary" /> {this.state.driverFirstName}{" "}
                    {this.state.driverLastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating
                      name="read-only"
                      value={this.state.driverRating}
                      readOnly
                    />
                    <LocalPhoneIcon color="primary" />{" "}
                    {this.state.driverPhoneNumber}
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div className="col-md-4">
              <Card
                className="card"
                style={{
                  maxWidth: 400,
                  boxShadow: " rgba(0, 0, 0, 0.09) 0px 3px 12px 0px",
                  borderRadius: "10px",
                }}
              >
                <CardActions>
                  <Button size="small">Trip Info</Button>
                </CardActions>

                <CardContent>
                  {/* <Typography variant="h5" component="div" style={{ fontFamily: 'Arial', marginBottom: '20px' }}>
        Trip Information
      </Typography> */}
                  {/* <hr /> */}
                  <div className="report-item" style={{ marginBottom: "11px" }}>
                    <LocationOnRoundedIcon
                      color="primary"
                      style={{ marginRight: "10px" }}
                    />
                    <span style={{ fontWeight: "bold" }}>
                      Pick Up Location:
                    </span>{" "}
                    {this.state.pickUpPlace}
                  </div>
                  <div className="report-item" style={{ marginBottom: "11px" }}>
                    <AccessTimeIcon
                      color="primary"
                      style={{ marginRight: "10px" }}
                    />
                    <span style={{ fontWeight: "bold" }}>Pick Up Time:</span>{" "}
                    {format(new Date(this.state.pickUpTime), "p, dd/MM/yyyy")}
                  </div>
                  <div className="report-item" style={{ marginBottom: "11px" }}>
                    <LocationOnRoundedIcon
                      color="primary"
                      style={{ marginRight: "10px" }}
                    />
                    <span style={{ fontWeight: "bold" }}>Destination:</span>{" "}
                    {this.state.destinationPlace}
                  </div>
                  {this.state.status === "Active" && (
                    <div
                      className="report-item"
                      style={{ marginBottom: "10px" }}
                    >
                      <AccessTimeIcon
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontWeight: "bold" }}>Drop Off Time:</span>{" "}
                      On Ride
                    </div>
                  )}
                  {this.state.status === "Ended" && (
                    <div
                      className="report-item"
                      style={{ marginBottom: "11px" }}
                    >
                      <AccessTimeIcon
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontWeight: "bold" }}>Drop Off Time:</span>{" "}
                      {format(
                        new Date(this.state.dropOffTime),
                        "p, dd/MM/yyyy"
                      )}
                    </div>
                  )}
                  {this.state.status === "Active" && (
                    <div
                      className="report-item"
                      style={{ marginBottom: "11px" }}
                    >
                      <RoundaboutLeftIcon
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontWeight: "bold" }}>
                        Estimated Distance:
                      </span>{" "}
                      {this.state.totalDistance} KM
                    </div>
                  )}
                  {this.state.status === "Ended" && (
                    <div
                      className="report-item"
                      style={{ marginBottom: "11px" }}
                    >
                      <RoundaboutLeftIcon
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontWeight: "bold" }}>
                        Actual Distance:
                      </span>{" "}
                      {this.state.actualTotalDistance} KM
                    </div>
                  )}
                  {this.state.status === "Active" && (
                    <div
                      className="report-item"
                      style={{ marginBottom: "11px" }}
                    >
                      <MonetizationOnRoundedIcon
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontWeight: "bold" }}>
                        Estimated Price:
                      </span>{" "}
                      {parseFloat(this.state.estimatedPrice).toFixed(2)} ETB
                    </div>
                  )}
                  {this.state.status === "Ended" && (
                    <div
                      className="report-item"
                      style={{ marginBottom: "11px" }}
                    >
                      <MonetizationOnRoundedIcon
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <span style={{ fontWeight: "bold" }}>Amount Paid:</span>{" "}
                      {parseFloat(this.state.actualPrice).toFixed(2)} ETB
                    </div>
                  )}
                  <div className="report-item" style={{ marginBottom: "11px" }}>
                    <AutorenewIcon
                      color="primary"
                      style={{ marginRight: "10px" }}
                    />
                    <span style={{ fontWeight: "bold", marginRight: "15px" }}>
                      Status:
                    </span>
                    {this.state.status === "Active" && (
                      <Badge
                        badgeContent={this.state.status}
                        color="warning"
                        style={{ marginLeft: "10px" }}
                      />
                    )}
                    {this.state.status === "Ended" && (
                      <Badge
                        badgeContent={this.state.status}
                        color="success"
                        style={{ marginLeft: "10px" }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* <GoogleMap
       //   mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        > */}

          <div className="map-container">
            {this.state.destination !== "" && this.state.origin !== "" && (
              <GoogleMap
                // required
                id="direction-example"
                // required
                mapContainerStyle={{
                  height: "350px",
                  width: "86%",
                  marginLeft: "255px",
                  marginRight: "10px",
                  marginTop: "100px",
                }}
                // required
                zoom={12}
                // required
                center={{
                  lat: 0,
                  lng: -180,
                }}
                // optional
                onClick={this.onMapClick}
                // optional
                onLoad={(map) => {
                  console.log("DirectionsRenderer onLoad map: ", map);
                }}
                // optional
                onUnmount={(map) => {
                  console.log("DirectionsRenderer onUnmount map: ", map);
                }}
              >
                <DirectionsService
                  // required
                  options={{
                    destination: this.state.destinationLocationLatitude.concat(
                      ",",
                      this.state.destinationLocationLongitude
                    ),
                    origin: this.state.pickUpLocationLatitude.concat(
                      ",",
                      this.state.pickUpLocationLongitude
                    ),
                    travelMode: this.state.travelMode,
                  }}
                  // required
                  callback={this.directionsCallback}
                  // optional
                  onLoad={(directionsService) => {
                    console.log(
                      "DirectionsService onLoad directionsService: ",
                      directionsService
                    );
                  }}
                  // optional
                  onUnmount={(directionsService) => {
                    console.log(
                      "DirectionsService onUnmount directionsService: ",
                      directionsService
                    );
                  }}
                />

                {this.state.response !== null && (
                  <DirectionsRenderer
                    // required
                    options={{
                      directions: this.state.response,
                    }}
                    // optional
                    onLoad={(directionsRenderer) => {
                      console.log(
                        "DirectionsRenderer onLoad directionsRenderer: ",
                        directionsRenderer
                      );
                    }}
                    // optional
                    onUnmount={(directionsRenderer) => {
                      console.log(
                        "DirectionsRenderer onUnmount directionsRenderer: ",
                        directionsRenderer
                      );
                    }}
                  />
                )}
              </GoogleMap>
            )}
          </div>

          {/* </GoogleMap> */}
        </LoadScript>
      );
    }
  }
}
export default withRouter(ViewReservation);
