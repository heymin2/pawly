// svg 파일 사용위한 커스텀
declare module "*.svg" {
  import React = require("react");
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
