"use server";

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request: NextRequest) => {return new NextResponse("A", {
//   status: 200,
// });
// }

export const GET = async (request: NextRequest) => {
  
    console.log("YAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHO");
    console.log(request.headers.get('Authorization'));
    console.log("YAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHOYAHO");

  // 외부 API로 통신
  const response = await axios
    .get("http://34.105.111.197:8080/api/v1/invoices/my", {
      headers: {
        Authorization: `${request.headers.get('Authorization')}`,
      },
      validateStatus: function (status) {
        return status < 500; // 상태 코드가 500 미만인 경우에만 해결
      },
    })
    .then((res) => {
      return new NextResponse(JSON.stringify(res.data), {
        status: 200,
      });
    })
    .catch((err) => {
      return new NextResponse(JSON.stringify(err.data), {
        status: 200,
      });
    });

  return response;

};
