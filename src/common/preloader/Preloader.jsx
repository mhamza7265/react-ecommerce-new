import { useEffect, useState } from "react";
import preloader from "../../assets/imgs/theme/loading.gif";

function Preloader({ children }) {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(() => true);
  }, [children]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(() => false);
    }, 1000);
  }, [children]);

  if (isloading) {
    return (
      <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="text-center">
              <img src={preloader} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  } else return children;
}

export default Preloader;
