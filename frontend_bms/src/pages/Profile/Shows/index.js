import React, {useEffect, useState} from 'react'
import { Col, Form, Modal, Row, Table, Button, message  } from 'antd';
import moment from 'moment'
import { GetAllMovies } from '../../../apicalls/movies';
import { AddShow, GetShowsByTheatreId,DeleteShow } from '../../../apicalls/shows';
function Shows({
    openShowsModal,
    setOpenShowsModal,
    theatre
}) {
    const [view, setView] = useState("list")
    const [shows,setShows]=useState([])
    const [movies,setMovies]=useState([])
    console.log(movies)

    const getData=async ()=>{
        try{
            console.log(theatre._id)
            const response=await GetShowsByTheatreId(theatre._id)
            const movieResponse=await GetAllMovies()
            if(movieResponse.data.success)
                {
                    setMovies(movieResponse.data.movies)
                   // message.success("Movies Fetched")
                }else{
                    message.error(movieResponse.data.message)
                }
            if(response.data.success)
                {
                    setShows(response.data.shows)
                    //message.success("Shows fetched")
                }
                else{
                    message.error(movieResponse.data.message)
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

    const handleAddShow=async (values)=>{
        try{
            const response=await AddShow({
                ...values,
                theatre:theatre._id
            })
            if(response.data.success)
                {
                    message.success(response.data.message)
                    setView("table")
                    getData()
                    
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

    const handleDeleteShow=async(id)=>{
        try{
            const response=await DeleteShow({
                showId:id
            })
            if(response.data.success)
                {
                    message.success(response.data.message)
                    getData()
                    
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
    const columns = [
        {
            title: "Show Name",
            dataIndex: "name",
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => {
             return moment(text).format("MMM Do YYYY");
            },
        },
        {
            title: "Time",
            dataIndex: "time",
        },
        {
            title: "Movie",
            dataIndex: "movie",
            render: (text, record) => {
                return record.movie.title;
            },
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats",
        },
        {
            title: "Available Seats",
            dataIndex: "availableSeats",
            render: (text, record) => {
                return record.totalSeats - record.bookedSeats.length;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className="flex gap-1 items-center">
                        {record.bookedSeats.length === 0 && (
                            <i
                                className="ri-delete-bin-line"
                                onClick={() => {
                                    handleDeleteShow(record._id);
                                }}
                            ></i>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <Modal title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}>

            <h1 className="text-primary text-md uppercase mb-1">
                Theatre : {theatre.name}
            </h1>

            <hr />

            <div className="flex justify-between mt-1 mb-1 items-center">
                <h1 className="text-md uppercase">
                    {view === "table" ? "Shows" : "Add Show"}
                </h1>
                {(
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setView("form");
                        }}
                    >Add Show</Button>
                )}
            </div>


            {view === 'list' && <Table columns={columns} dataSource={shows} />}


            {view === "form" && (
                <Form layout="vertical" onFinish={handleAddShow}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label="Show Name"
                                name="name"
                                rules={[{ required: true, message: "Please input show name!" }]}
                            >
                                <input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: "Please input show date!" }]}
                            >
                                <input
                                    type="date"
                                    min={new Date()}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[{ required: true, message: "Please input show time!" }]}
                            >
                                <input type="time" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Movie"
                                name="movie"
                                rules={[{ required: true, message: "Please select movie!" }]}
                            >
                                <select>
                                    <option value="">Select Movie</option>
                                    {movies.map((movie) => (
                    <option value={movie._id}>{movie.title}</option>
                  ))}
                                </select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Ticket Price"
                                name="ticketPrice"
                                rules={[
                                    { required: true, message: "Please input ticket price!" },
                                ]}
                            >
                                <input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Total Seats"
                                name="totalSeats"
                                rules={[
                                    { required: true, message: "Please input total seats!" },
                                ]}
                            >
                                <input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-end gap-1">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setView("list");
                            }}
                        >Cancel</Button>
                        <Button variant="contained" htmlType="submit">
                        
                            SAVE
                        </Button>
                    </div>
                </Form>
            )}
        </Modal>
    )

}

export default Shows
