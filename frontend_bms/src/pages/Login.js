import React, { useEffect } from 'react'
import {Form,message,Button} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../apicalls/users'

function Login() {
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("token"))
      {
        navigate("/")
      }
  },[])
  const onFinish=async (values)=>{
    console.log({values})
    try{
      const {data}=await LoginUser(values)
      //console.log(response)
      if(data.success)
        {
          localStorage.setItem("token",data.jwtToken)
          navigate("/")
          message.success(data.message)
        }
        else
        {
          message.error(data.message)
        }
   
  }catch(e){}
  }
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
    <div className="card p-3 w-400">
      <h1 className="text-xl mb-1">Welcome Again! Please Login</h1>
      <hr />
      <Form layout="vertical" className="mt-1" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <input type="password" />
        </Form.Item>

        <div className="flex flex-col mt-2 gap-1">
          <Button fullWidth  type="primary" htmlType="submit">Login</Button>
          <Link to="/register" className="text-primary">
            Don't have an account? Register
          </Link>
        </div>
      </Form>
    </div>
  </div>
  )

}

export default Login
