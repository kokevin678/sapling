import React from "react";
import {Container} from "react-bootstrap"
import {Bar,Line,Pie} from "react-chartjs-2";

function Graph(){
    return(
        <Container>
            <Line
                  data={{
                    labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
                    datasets:[{
                      label:"walmart",
                      fill:false,
                      data:[
                        110.00,
                        14.00,
                        20.00,
                        5000.00,
                        100.00,
                        20.00,
                        40.00
                      ]
                    },
                  ],
                  datasets:[{
                    label:"walmart",
                    fill:false,
                    data:[
                      110.00,
                      14.00,
                      20.00,
                      5000.00,
                      100.00,
                      20.00,
                      40.00
                    ],
                    label:"Ama",
                    fill:false,
                    data:[
                      110.00,
                      14.00,
                      20.00,
                    ],
                    
                    backgroundColor:[

                    ]
                  },
                ],
                  
                  }}
                  width={10000}
                  height={10000}
                  options={{ 
                    title:{
                      display:true,
                      text:"Your item History",
                    },
                    fill:false
                  }}
                  />

        </Container>

    )
}

export default Graph