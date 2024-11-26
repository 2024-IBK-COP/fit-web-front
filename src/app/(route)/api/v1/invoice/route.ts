"use server";

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {



    const invoiceId = request.nextUrl.searchParams.get("invoiceId");

    console.log("AYOAYOAYOAYOAYOAYOAYOAYOAYOAYOAYOAYOAYOAYOAYO");

    // console.log("request.headers.get('Authorization')request.headers.get('Authorization')request.headers.get('Authorization')");
    // console.log(request.headers.get('Authorization'));
    // console.log("request.headers.get('Authorization')request.headers.get('Authorization')request.headers.get('Authorization')");

    // 외부 API로 통신
    // const response = await axios
    //     .get(`http://34.105.111.197:8080/api/v1/invoices/${invoiceId}`, {
    //         headers: {
    //             Authorization: `${request.headers.get('Authorization')}`,
    //           },
    //         validateStatus: function (status) {
    //             return status < 500; // 상태 코드가 500 미만인 경우에만 해결
    //         },
    //     })
    //     .then((res) => {
    //         console.log("console.log(res);console.log(res);")
    //         console.log(res);
    //         console.log("console.log(res);console.log(res);")

    //         return new NextResponse(JSON.stringify(res.data), {
    //             status: 200,
    //         });
    //     })
    //     .catch((err) => {
    //         return new NextResponse(JSON.stringify(err.data), {
    //             status: 200,
    //         });
    //     });

    const response = await axios
    .get(`http://localhost:8000/invoice/${invoiceId}`, {
        validateStatus: function (status) {
            return status < 500; // 상태 코드가 500 미만인 경우에만 해결
        },
    })
    .then((res) => {

        const headers = new Headers();

        headers.set("Content-Type", "application/pdf");

        // return res.data;
        return new NextResponse(res.data, {
            status: 200,
            headers
        });
        // return new NextResponse(JSON.stringify(res.data), {
        //     status: 200,
        // });
    })
    .catch((err) => {
        return new NextResponse(JSON.stringify(err.data), {
            status: 200,
        });
    });

    return response;

};
