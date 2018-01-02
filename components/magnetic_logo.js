////////////////////////////////////////////////////////////////////////////////////////////////////
//_magnetic_logo.js_________________________________________________________________________________
////////////////////////////////////////////////////////////////////////////////////////////////////
//_imports__________________________________________________________________________________________
import React from "react";
import {
	AppRegistry,
	asset,
	Pano,
	Text,
	View,
	Model,
	Animated
} from "react-vr";
const magnetic_M = Animated.createAnimatedComponent(Model);
////////////////////////////////////////////////////////////////////////////////////////////////////
//_magnetic_logo____________________________________________________________________________________
export default class Magnetic_logo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anim: {
				rings: {
					tx: 0,
					ty: 0,
					tz: new Animated.Value(-100),
					rx: 30,
					ry: new Animated.Value(0),
					scale: new Animated.Value(0.01),
					opacity: 0.168
				}
			}
		};
	}
	//**********************************************************************************************
	//_ANIMATIONS___________________________________________________________________________________
	intro() {
		Animated.timing(this.state.anim.rings.scale, {
			toValue: 10,
			duration: 5000
		}).start();
		Animated.timing(this.state.anim.rings.tz, {
			toValue: -63,
			duration: 10000
		}).start();
	}
	//____________________________________________________________________________________________intro^
	turnTable() {
		Animated.timing(this.state.anim.rings.ry, {
			toValue: 360,
			duration: 8000
		}).start(() => {
			this.state.anim.rings.ry.setValue(0);
			// this.turnTable();
		});
	}
	//________________________________________________________________________________________turnTable^
	//**************************************************************************************************
	render() {
		return (
			<View>
				<Rings_animation
					materialParameters={{ wireframe: false }}
					// {wireframeLinewidth: 0.01},
					// {color: 0xff33cc}
					// texture={asset("gradientColor.jpeg")}
					source={{
						obj: asset("rings.obj")
						// mtl: asset("sphere.mtl")
					}}
					style={{
						transform: [
							{ translate: [-40, 20, this.state.anim.rings.tz] },
							{ scale: this.state.anim.rings.scale },
							{ rotateZ: 0 },
							{ rotateY: this.state.anim.rings.ry },
							{ rotateX: this.state.anim.rings.rx }
						],
						opacity: this.state.anim.rings.opacity
					}}
				/>
				<Rings_animation
					materialParameters={{ wireframe: true }}
					// {wireframeLinewidth: 0.01},
					// {color: 0xff33cc}
					// texture={asset("gradientColor.jpeg")}
					source={{
						obj: asset("rings.obj")
						// mtl: asset("sphere.mtl")
					}}
					style={{
						transform: [
							{ translate: [-40, 20, this.state.anim.rings.tz] },
							{ scale: this.state.anim.rings.scale },
							{ rotateZ: 0 },
							{ rotateY: this.state.anim.rings.ry },
							{ rotateX: this.state.anim.rings.rx }
						],
						opacity: this.state.anim.rings.opacity
					}}
				/>
			</View>
		);
	}
}
AppRegistry.registerComponent('Magnetic_logo', () => Magnetic_logo);