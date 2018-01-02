import React from "react";
import Anomoly from "./components/anomoly";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated
} from "react-vr";
const Logo_animation = Animated.createAnimatedComponent(Model);

export default class magnetic_lab_vr extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   x: 0,
    //   y: 0
    // }
  }
  // _onMouseMove(e) {
  //   this.setState({ x: e.offset[0], y: e.offset[1] });
  //   console.log(this.state.x,this.state.y)
  // }
  //**************************************************************************************************
  componentDidMount() {
    this.refs.anomoly.intro(2);
    this.refs.anomoly.turnTable(2);
    this.refs.anomoly.ringSpinA(5)
    this.refs.anomoly.ringSpinB(7)
    this.refs.anomoly.ringSpinC(10)
  }
  render() {
    return (
      <Animated.View>
        <Logo_animation
          materialParameters={({ wireframe: false }, { color: 0xff1663 })}
          // {wireframeLinewidth: 0.01},
          // {color: 0x}
          // texture={asset("gradientColor.jpeg")}
          source={{
            obj: asset("magnetic.obj")
            // mtl: asset("sphere.mtl")
          }}
          style={{
            transform: [
              { translate: [10, -25, -100] },
              { scale: 8 },
              { rotateZ: 0 },
              { rotateY: 0 },
              { rotateX: 0 }
            ]
          }}
        />
        <Anomoly ref="anomoly" />
      </Animated.View>
    );
  }
}
AppRegistry.registerComponent("magnetic_lab_vr", () => magnetic_lab_vr);
