 import React, { useEffect, useState} from 'react'
 import {useNavigate} from 'react-router-dom'
 import { GetAllMovies } from '../apicalls/movies'
import { Row, message,Col } from 'antd'

function Home() {

  const [movies,setMovies]=useState([])
  //console.log({movies})
  
  const navigate=useNavigate()

  const getData=async ()=>{
    try{
      const response = await GetAllMovies()
      console.log(response)
      if(response.data.success)
        { 
          setMovies(response.data.movies)
        }
        else
        {
          message.error(response.data.message)
        }
    }
    catch(error)
    {
      message.error(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  
  return (
    <div>
       <h1 className="text-md uppercase mb-2">Currently Showing Movies</h1>

      <Row gutter={[20]} className='mt-2'>
      {
        movies.map((movie)=>(
          <Col span={6}>
            <div 
            className='card flex flex-col gap-3 cursor-pointer'
            onClick={()=>{
              navigate(`/movie/${movie._id}`)
            }}
            >
            <img src={movie.poster} height={200} style={{ backgroundSize: "cover"}} alt="Image poster" />
            <div className='flex justify-center p-1'>
                  <h1 className="text-md uppercase">{movie.title}</h1>
                </div>

            </div>
          </Col>
        ))
      }
      </Row>

    </div>
  )
}
export default Home
