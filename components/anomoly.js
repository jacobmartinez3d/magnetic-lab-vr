////////////////////////////////////////////////////////////////////////////////////////////////////
//_anomoly.js__________________________________________________________________________________
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
	Animated,
	Sphere,
	VrButton
} from "react-vr";

const Rings_animation = Animated.createAnimatedComponent(Model);
const Letter_animation = Animated.createAnimatedComponent(Model);
const View_animation = Animated.createAnimatedComponent(Model);
const Model_animation = Animated.createAnimatedComponent(Model);
////////////////////////////////////////////////////////////////////////////////////////////////////
//_shot_actions_____________________________________________________________________________________
export default class Anomoly extends React.Component {
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
				},
				nucleus: {
					ringSpinA: [new Animated.Value(0), new Animated.Value(0)],
					ringSpinB: [new Animated.Value(0), new Animated.Value(0)],
					ringSpinC: [new Animated.Value(0), new Animated.Value(0)]
				}
			},
			nucleusPressed: false,
			matrixEffect_tex: asset("matrixEffect_alpha.jpeg")
		};
	}

	//**************************************************************************************************
	//_ANIMATIONS_______________________________________________________________________________________
	intro(duration) {
		duration = duration * 1000;
		Animated.timing(this.state.anim.rings.scale, {
			toValue: 10,
			duration: duration / 2
		}).start();
		Animated.timing(this.state.anim.rings.tz, {
			toValue: -63,
			duration: duration
		}).start();
	}
	//____________________________________________________________________________________________intro^
	turnTable(duration) {
		duration = duration * 1000;
		Animated.timing(this.state.anim.rings.ry, {
			toValue: 360,
			duration: duration
		}).start(() => {
			this.state.anim.rings.ry.setValue(0);
			// this.turnTable();
		});
	}
	//________________________________________________________________________________________turnTable^
	ringSpinA(duration) {
		let user_duration = duration;
		Animated.timing(this.state.anim.nucleus.ringSpinA[0], {
			toValue: 359,
			duration: user_duration * 100
		}).start(() => {
			this.state.anim.nucleus.ringSpinA[0].setValue(0);
			//start a child process to rotate in opposite axis
			Animated.timing(this.state.anim.nucleus.ringSpinA[1], {
				toValue: 359,
				duration: user_duration * 100
			}).start(() => {
				this.state.anim.nucleus.ringSpinA[1].setValue(0);
				// loop self
				this.ringSpinA(user_duration);
			});
		});
	}
	ringSpinB(duration) {
		let user_duration = duration;
		Animated.timing(this.state.anim.nucleus.ringSpinB[0], {
			toValue: 359,
			duration: user_duration * 1.618 * 100
		}).start(() => {
			this.state.anim.nucleus.ringSpinB[0].setValue(0);
			Animated.timing(this.state.anim.nucleus.ringSpinB[1], {
				toValue: 359,
				duration: user_duration * 1.168 * 100
			}).start(() => {
				this.state.anim.nucleus.ringSpinB[1].setValue(0);
				this.ringSpinB(user_duration);
			});
		});
	}
	ringSpinC(duration, play = true) {
		let user_duration = duration;
		Animated.timing(this.state.anim.nucleus.ringSpinC[0], {
			toValue: 359,
			duration: user_duration * 1.618 * 1.618 * 100
		}).start(() => {
			this.state.anim.nucleus.ringSpinC[0].setValue(0);
			Animated.timing(this.state.anim.nucleus.ringSpinC[1], {
				toValue: 359,
				duration: user_duration * 1.168 * 1.168 * 100
			}).start(() => {
				this.state.anim.nucleus.ringSpinC[1].setValue(0);
				this.ringSpinC(user_duration);
			});
		});
	}
	nucleusClick() {
		console.log("you clicked da nucleus")
		this.setState(
			{
				matrixEffect_tex: this.state.nucleusPressed? asset("matrixEffect_alpha.jpeg") : asset("matrixCode_COLOR.jpg")
			}, () => {
				this.setState({nucleusPressed: !this.state.nucleusPressed})
			})
	}
	//**************************************************************************************************
	render() {
		return (
			<View>
				{
					// "MAGNETIC".split("").map((c) => {
					// const check = "magnetic_" + c + ".obj"
					// 	return (
					// 		<Letter_animation
					// 			source={{
					// 				obj: asset(check)
					// 			}}
					// 		/>
					// 	)
					// })
				}

				<View_animation
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
				>
					<VrButton onClick={() => this.nucleusClick()}>
						{
							//_rings_______________________________________________________________________
						}
						<Model_animation
							texture={this.state.matrixEffect_tex}
							wireframe={this.state.nucleusPressed}
							source={{
								obj: asset("ring_A.obj")
							}}
							style={{
								transform: [
									{ translate: [0, 0, 0] },
									{ scale: 0.1 },
									{
										rotateY: this.state.anim.nucleus
											.ringSpinA[0]
									},
									{
										rotateZ: this.state.anim.nucleus
											.ringSpinA[1]
									}
								]
							}}
						/>

						<Model_animation
							texture={this.state.matrixEffect_tex}
							wireframe={this.state.nucleusPressed}
							source={{
								obj: asset("ring_A.obj")
							}}
							style={{
								transform: [
									{ translate: [0, 0, 0] },
									{ scale: 0.2 },
									{
										rotateY: this.state.anim.nucleus
											.ringSpinB[0]
									},
									{
										rotateZ: this.state.anim.nucleus
											.ringSpinB[1]
									}
								]
							}}
						/>

						<Model_animation
							texture={this.state.matrixEffect_tex}
							wireframe={this.state.nucleusPressed}
							source={{
								obj: asset("ring_A.obj")
							}}
							style={{
								transform: [
									{ translate: [0, 0, 0] },
									{ scale: 0.4 },
									{
										rotateY: this.state.anim.nucleus
											.ringSpinC[0]
									},
									{
										rotateZ: this.state.anim.nucleus
											.ringSpinC[1]
									}
								]
							}}
						/>
						{
							//_nucleus_______________________________________________________________________
						}
						<Model
							wireframe={true}
							source={{
								obj: asset("nucleus.obj")
							}}
							style={{
								transform: [
									{ translate: [0, 0, 0] },
									{ scale: 0.1 },
									{ rotateY: 125 }
								]
							}}
						/>
					</VrButton>
				</View_animation>

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
AppRegistry.registerComponent("Anomoly", () => Anomoly);
