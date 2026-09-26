import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import {
  Color,
  Group,
  MathUtils,
  Quaternion,
  Vector3,
  type Vector3Tuple,
} from "three";

export type VisualizationMode = "wireframe" | "solid" | "stress";

type StructuralModelProps = {
  mode: VisualizationMode;
  scrollProgress: MutableRefObject<number>;
  reducedMotion: boolean;
};

type BeamDefinition = {
  start: Vector3Tuple;
  end: Vector3Tuple;
  stress: number;
};

const nodes: Vector3Tuple[] = [
  [-2.7, -1.65, -1.25],
  [0, -1.65, -1.25],
  [2.7, -1.65, -1.25],
  [-2.7, 1.55, -1.25],
  [0, 2.15, -1.25],
  [2.7, 1.55, -1.25],
  [-2.7, -1.65, 1.25],
  [0, -1.65, 1.25],
  [2.7, -1.65, 1.25],
  [-2.7, 1.55, 1.25],
  [0, 2.15, 1.25],
  [2.7, 1.55, 1.25],
];

const connectionPairs = [
  [0, 1],
  [1, 2],
  [3, 4],
  [4, 5],
  [0, 3],
  [2, 5],
  [0, 4],
  [2, 4],
  [6, 7],
  [7, 8],
  [9, 10],
  [10, 11],
  [6, 9],
  [8, 11],
  [6, 10],
  [8, 10],
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
  [3, 10],
  [4, 9],
  [4, 11],
  [5, 10],
] as const;

const beams: BeamDefinition[] = connectionPairs.map(([start, end], index) => ({
  start: nodes[start],
  end: nodes[end],
  stress: 0.12 + ((index * 37) % 87) / 100,
}));

function Beam({ start, end, stress, mode }: BeamDefinition & { mode: VisualizationMode }) {
  const { midpoint, quaternion, length } = useMemo(() => {
    const startVector = new Vector3(...start);
    const endVector = new Vector3(...end);
    const direction = endVector.clone().sub(startVector);

    return {
      midpoint: startVector.clone().add(endVector).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        direction.clone().normalize(),
      ),
      length: direction.length(),
    };
  }, [end, start]);

  const color = useMemo(() => {
    if (mode === "stress") {
      return new Color("#1595D3").lerp(new Color("#F4B91F"), stress);
    }
    return mode === "wireframe" ? new Color("#58B5E1") : new Color("#C6D9E8");
  }, [mode, stress]);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.065, 0.065, length, 8]} />
      {mode === "solid" ? (
        <meshStandardMaterial
          color={color}
          metalness={0.72}
          roughness={0.24}
          emissive="#071B36"
          emissiveIntensity={0.4}
        />
      ) : (
        <meshBasicMaterial
          color={color}
          wireframe={mode === "wireframe"}
          toneMapped={false}
        />
      )}
    </mesh>
  );
}

export function StructuralModel({
  mode,
  scrollProgress,
  reducedMotion,
}: StructuralModelProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const movementScale = reducedMotion ? 0.18 : 1;
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.34 * movementScale + scrollProgress.current * 0.7,
      4,
      delta,
    );
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.14 * movementScale + 0.08,
      4,
      delta,
    );
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      -scrollProgress.current * 0.35,
      3,
      delta,
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.15}
      rotationIntensity={reducedMotion ? 0 : 0.08}
      floatIntensity={reducedMotion ? 0 : 0.18}
    >
      <group ref={groupRef} rotation={[0.08, -0.25, 0]}>
        {beams.map((beam, index) => (
          <Beam key={`${index}-${mode}`} {...beam} mode={mode} />
        ))}
        {nodes.map((node, index) => (
          <mesh key={index} position={node}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial
              color={mode === "stress" && index % 3 === 1 ? "#F4B91F" : "#E7EEF4"}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
