"use server";

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request: NextRequest) => {return new NextResponse("A", {
//   status: 200,
// });
// }

export const POST = async (request: NextRequest) => {
  const body = await request.json(); // 클라이언트에서 받은 데이터

  

  // 외부 API로 통신
  const response = await axios
    .post("http://34.105.111.197:8080/login", body, {
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
