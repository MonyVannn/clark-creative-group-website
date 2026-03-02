import GradientBlinds from "./components/GradientBlinds";
import HeroSection from "./components/HeroSection";
import Beams from "./components/Beam";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ff9933"
          speed={5.5}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <HeroSection />
    </div>
  );
}
