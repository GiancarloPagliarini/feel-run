import { Image, ImageSourcePropType } from "react-native";

interface LogoFeelRunProps {
  width: number;
  height: number;
  resizeMode: "center" | "cover" | "contain" | "stretch";
  sourcePath: ImageSourcePropType;
}

export function LogoFeelRun({
  height,
  resizeMode = "cover",
  width,
  sourcePath,
}: LogoFeelRunProps) {
  return (
    <Image
      source={sourcePath}
      style={{ width: width, height: height, resizeMode: resizeMode }}
      resizeMode={resizeMode}
    />
  );
}
