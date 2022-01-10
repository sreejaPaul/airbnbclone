import { useState } from "react";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
import Image from "next/image";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 350px;
    height: 200px;
`;

function PageLoader({loading }) {
  return (
    <div className="w-screen g h-screen bg-gray-50 flex justify-center place-items-center flex-col dark:bg-slate-500">
          <div className="relative mb-5 flex flex-col justify-center place-items-center w-44 h-44">
            <Image src="https://news.airbnb.com/wp-content/uploads/sites/4/2017/01/airbnb_vertical_lockup_web.png?fit=451%2C493"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <BarLoader color={"pink"} loading={loading} css={override} />
        </div>
  );
}
export default PageLoader;