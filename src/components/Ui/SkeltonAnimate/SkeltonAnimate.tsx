import "./SkeltonAnimate.scss";

type Props = {
  width: string;
  height: string;
  borderRadius?: string;
};
const SkeltonAnimate: React.FC<Props> = ({ width, height, borderRadius }) => {
  let styleProp = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };
  return <div className="animate-box" style={styleProp}></div>;
};

export default SkeltonAnimate;
