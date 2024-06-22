import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd';
import { axiosInstance } from '../../apicalls/axiosInstance';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';

function TheatresList() {

    const [theatres,setTheatres]=useState([])

    const getData=async ()=>{
        try{
            const response=await GetAllTheatres()

            if(response.data.success)
                {
                    message.success("Theatres are fetched")
                    setTheatres(response.data.theatres)
                }
                else{
                    message.error("Something went wrong")
                }
        }
        catch(error)
        {
            console.log(error)
            message.error("Something went wrong")
        }
    }

    const handleStatusChange=async (theatre)=>{
        const response=await UpdateTheatre({
            theatreId:theatre._id,
            ...theatre,
            isActive:!theatre.isActive
        })
        if(response.data.success)
            {
                if(theatres.isActive)
                    {
                        message.success("Theatre blocked successfully")
                    }
                else
                {
                    message.success("Theatre Activated successfully")
                }
                getData()
            }
        else
        {
            message.error("Something went wrong")
            console.log(response.data.message)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Owner",
          dataIndex: "owner",
          render: (text, record) => {
            return record.owner.name;
          },
        },
        {
          title: "Status",
          dataIndex: "isActive",
          render: (text, record) => {
            if (text) {
              return "Approved";
            } else {
              return "Pending / Blocked";
            }
          },
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => {
            return (
              <div className="flex gap-1">
                {record.isActive && (
                  <span
                    className="underline"
                    onClick={() => handleStatusChange(record)}
                  >
                    Block
                  </span>
                )}
                {!record.isActive && (
                  <span
                    className="underline"
                    onClick={() => handleStatusChange(record)}
                  >
                    Approve
                  </span>
                )}
              </div>
            );
          },
        },
      ];

    return (
        <div>
          <Table columns={columns} dataSource={theatres}  />
        </div>
      );

}

export default TheatresList
