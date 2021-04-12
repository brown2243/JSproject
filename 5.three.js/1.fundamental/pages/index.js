import Head from "next/head";
import styles from "../styles/Home.module.css";

// Three.js HomePage Tutorial
import Box from "../components/box";
import Tutorial from "../components/tutorial";
import TutorialLine from "../components/tutorialLine";
import TutorialLoader from "../components/tutorialLoader";
// Three.js Fundamentals Tutorial
// Basic
import Fundamentals from "../components/basics/Fundamentals";
import Responsive from "../components/basics/Responsive";
// dat;
import Dat from "../components/fundamentals/Dat";
// Fundamentals
import Primitives from "../components/fundamentals/Primitives";
import Scenegraph from "../components/fundamentals/Scenegraph";
import Materials from "../components/fundamentals/Materials";
import Textures from "../components/fundamentals/Textures";
import Lights from "../components/fundamentals/Lights";
import Cameras from "../components/fundamentals/Cameras";
import Cameras2 from "../components/fundamentals/Cameras2";
import Cameras3 from "../components/fundamentals/Cameras3";
import Shadows from "../components/fundamentals/Shadows";
import Shadows2 from "../components/fundamentals/Shadows2";
import Fogs from "../components/fundamentals/Fogs";
import RenderTargets from "../components/fundamentals/RenderTargets";
import BufferGeometry from "../components/fundamentals/BufferGeometry";
import BufferGeometry2 from "../components/fundamentals/BufferGeometry2";
// tips
import OptimizingObj from "../components/Tips/OptimizingObj";
import OptimizingAni from "../components/Tips/OptimizingAni";
// solution
import LoadOBJ from "../components/solution/LoadOBJ";
import LoadGLTF from "../components/solution/LoadGLTF";
import Skybox from "../components/solution/Skybox";
import Transparent from "../components/solution/Transparent";
import MultiCanvas from "../components/solution/MultiCanvas";
import Picking from "../components/solution/Picking";
import PostProcessing from "../components/solution/PostProcessing";
import Shaders from "../components/solution/Shaders";
import Html3D from "../components/solution/Html3D";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello Three.JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* first tutorial */}
        {/* <Box />
        <Tutorial />
        <TutorialLine />
        <TutorialLoader /> */}
        {/* Basic */}
        {/* <Fundamentals /> */}
        {/* <Responsive /> */}
        {/* <Dat></Dat> */}
        {/* Fundamentals */}
        {/* <Primitives /> */}
        {/* <Scenegraph /> */}
        {/* <Materials /> */}
        {/* <Textures /> */}
        {/* <Lights /> */}
        {/* <Cameras /> */}
        {/* <Cameras2 /> */}
        {/* <Cameras3 /> */}
        {/* <Shadows /> */}
        {/* <Shadows2 /> */}
        {/* <Fogs /> */}
        {/* <RenderTargets /> */}
        {/* <BufferGeometry /> */}
        {/* <BufferGeometry2 /> */}

        {/* Tips */}
        {/* <OptimizingObj /> */}
        {/* <OptimizingAni /> */}

        {/* solution */}
        {/* <LoadOBJ /> */}
        {/* <LoadGLTF /> */}
        {/* <Skybox /> */}
        {/* <Transparent /> */}
        {/* <MultiCanvas /> 그냥 넘어감  */}
        {/* <Picking /> */}
        {/* <PostProcessing /> */}
        <Shaders />
        {/* <Html3D /> */}
      </div>
    </>
  );
}
