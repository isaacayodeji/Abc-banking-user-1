import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig, baseUrl } from "../apiConfig";

const authentication = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints(builder){
        return{
            login: builder.mutation({
                query: (request) => {
                    return{
                        url: apiConfig.auth.AdminLogin,
                        method: 'POST',
                        body: {
                            email: window.btoa(request?.email as string),
                            password: window.btoa(request?.password as string)
                        }
                    }
                }
            })
        }
    }
})
export const {useLoginMutation}= authentication

export {authentication}